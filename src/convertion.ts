import { BmConfig, CALL_METHOD, Pool } from "@bitmatrix/models";
import { div } from "./utils/helper";

export const convertForCtx = (value: number, slippage: number, pool: Pool, config: BmConfig, callMethod: CALL_METHOD): { amount: number; amountWithSlipapge: number } => {
  const pair_1_coefficient = pool.pair1_coefficient.number;
  const pair_1_pool_supply = Number(pool.quote.value);

  const pair_2_pool_supply = Number(pool.token.value);

  let pair_2_coefficient;

  if (pair_2_pool_supply >= pair_1_pool_supply) {
    pair_2_coefficient = Math.floor(pair_2_pool_supply / pair_1_pool_supply) * pair_1_coefficient;
  } else {
    pair_2_coefficient = Math.floor(pair_1_coefficient / Math.floor(pair_1_pool_supply / pair_2_pool_supply));
  }

  if (pair_2_coefficient < 1) {
    pair_2_coefficient = 1;
  }

  if (callMethod === CALL_METHOD.SWAP_QUOTE_FOR_TOKEN) {
    if (value < Number(config.minRemainingSupply)) {
      // console.log(`Quote amount must greater or at least minimum equal ${config.minRemainingSupply}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }

    // step1  (lp fee calculate)
    const lpFee = div(value, pool.lpFeeTierIndex.number);

    // step 2 (sub fee amount)
    const quoteAmountSubFee = value - lpFee;

    // step 3 (poolLbtcLiquidity  + lbtcAmountSubFee)
    const quotePoolTotalAmount = Number(pool.quote.value) + quoteAmountSubFee;

    // step 4 (lbtPoolTotalAmount with rate 16)
    const quotePoolTotalAmountWithRate = div(quotePoolTotalAmount, pair_1_coefficient);

    // step 5 (lbtPoolAmount  with rate 16)
    const quotePoolAmountWithRate = div(Number(pool.quote.value), pair_1_coefficient);

    // step 6 (tokenPoolAmount  with rate 2 million)
    const tokenPoolAmountWithRate = div(Number(pool.token.value), pair_2_coefficient);

    // step 7 (mul step 5 , step6)
    const poolRateMul = quotePoolAmountWithRate * tokenPoolAmountWithRate;

    // step 8 (div step7  step4)
    const poolRateMulWithQuotePoolRate = div(poolRateMul, quotePoolTotalAmountWithRate);

    // step 9  (step8 * 2 million)
    const poolRateMulWithLbtcPoolRateMul = poolRateMulWithQuotePoolRate * pair_2_coefficient;

    // step 10  (Pool Token liquidity - 9.step)
    const finalTokenPoolLiquidity = Number(pool.token.value) - poolRateMulWithLbtcPoolRateMul;

    //step11 ( step 10 - 1milion)
    const tokenAmount = finalTokenPoolLiquidity - config.recipientValueMinus;

    const slippageAmount = div(tokenAmount, slippage);

    const receivedAmount = tokenAmount - slippageAmount;

    return { amount: tokenAmount, amountWithSlipapge: receivedAmount };
  } else if (callMethod === CALL_METHOD.SWAP_TOKEN_FOR_QUOTE) {
    // validation
    if (value < Number(config.minTokenValue)) {
      // console.log(`Token amount must greater or at least minimum equal ${config.minTokenValue}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }

    // step1 (fee calculation)
    const lpFee = div(value, pool.lpFeeTierIndex.number);

    // step2 (input new value without fee  input - step1)
    const tokenAmountWithoutFee = value - lpFee;

    // step3 (total token pool amount poolTokenLiquidity + step2)
    const totalTokenLiquidity = pair_2_pool_supply + tokenAmountWithoutFee;

    // step4  (token Liquidty rate calculation step3 % 2mn)
    const tokenLiquidtyRate = div(totalTokenLiquidity, pair_2_coefficient);

    // step5 (Pool L-BTC liquidity % 16)
    const x = div(pair_1_pool_supply, pair_1_coefficient);

    // step6 (Pool Token liquidity % 2MN)
    const y = div(pair_2_pool_supply, pair_2_coefficient);

    // step 7 (constant x*y = k step5*step6)
    const constant = x * y;

    // step 8 (constant * tokenLiquidtyRate  step7*step4
    const constantRate = div(constant, tokenLiquidtyRate);

    //step 9 (step 8 * 16)
    const lbtcAmount = constantRate * pair_1_coefficient;

    //step 10 (poolLbtcLiquidity - step9)
    const tokenValue = pair_1_pool_supply - lbtcAmount;

    const slippageAmount = div(tokenValue, slippage);

    const receivedAmount = tokenValue - slippageAmount;

    return { amount: tokenValue, amountWithSlipapge: receivedAmount };
  }

  return { amount: 0, amountWithSlipapge: 0 };
};

export const convertForCtx2 = (value: number, slippage: number, pool: Pool, config: BmConfig, callMethod: CALL_METHOD): { amount: number; amountWithSlipapge: number } => {
  const pair_1_coefficient = pool.pair1_coefficient.number;
  const pair_1_pool_supply = Number(pool.quote.value);

  const pair_2_pool_supply = Number(pool.token.value);

  let pair_2_coefficient;

  if (pair_2_pool_supply >= pair_1_pool_supply) {
    pair_2_coefficient = Math.floor(pair_2_pool_supply / pair_1_pool_supply) * pair_1_coefficient;
  } else {
    pair_2_coefficient = Math.floor(pair_1_coefficient / Math.floor(pair_1_pool_supply / pair_2_pool_supply));
  }

  if (pair_2_coefficient < 1) {
    pair_2_coefficient = 1;
  }

  if (callMethod === CALL_METHOD.SWAP_QUOTE_FOR_TOKEN) {
    if (value < Number(config.minTokenValue)) {
      // console.log(`Quote amount must greater or at least minimum equal ${config.minRemainingSupply}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }

    // extra
    const quotePoolAmountWithRate = div(pair_1_pool_supply, pair_1_coefficient);
    const tokenPoolAmountWithRate = div(pair_2_pool_supply, pair_2_coefficient);
    const poolRateMul = quotePoolAmountWithRate * tokenPoolAmountWithRate;

    // step 1
    const finalTokenPoolLiquidity = value + config.recipientValueMinus;

    // step 2
    const poolRateMulWithLbtcPoolRateMul = pair_2_pool_supply - finalTokenPoolLiquidity;

    // step 3
    const poolRateMulWithQuotePoolRate = div(poolRateMulWithLbtcPoolRateMul, pair_2_coefficient);

    // step 4
    const quotePoolTotalAmountWithRate = div(poolRateMul, poolRateMulWithQuotePoolRate);

    // step 5
    const quotePoolTotalAmount = quotePoolTotalAmountWithRate * pair_1_coefficient;

    // step 6
    const quoteAmountSubFee = quotePoolTotalAmount - pair_1_pool_supply;

    const inp = div(pool.lpFeeTierIndex.number * quoteAmountSubFee, pool.lpFeeTierIndex.number - 1);

    const slippageAmount = div(value, slippage);

    const receivedAmount = value - slippageAmount;

    if (inp < Number(config.minRemainingSupply)) {
      console.log("1");
      // console.log(`Quote amount must greater or at least minimum equal ${config.minRemainingSupply}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }

    return { amount: inp, amountWithSlipapge: receivedAmount };
  } else if (callMethod === CALL_METHOD.SWAP_TOKEN_FOR_QUOTE) {
    // validation
    if (value < Number(config.minRemainingSupply)) {
      // console.log(`Token amount must greater or at least minimum equal ${config.minTokenValue}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }
    const lbtcAmount = pair_1_pool_supply - value;

    const constantRate = div(lbtcAmount, pair_1_coefficient);

    const x = div(pair_1_pool_supply, pair_1_coefficient);

    const y = div(pair_2_pool_supply, pair_2_coefficient);

    const constant = x * y;

    const tokenLiquidtyRate = div(constant, constantRate);

    const totalTokenLiquidity = tokenLiquidtyRate * pair_2_coefficient;

    const tokenAmountWithoutFee = totalTokenLiquidity - pair_2_pool_supply;

    const inp = div(pool.lpFeeTierIndex.number * tokenAmountWithoutFee, pool.lpFeeTierIndex.number - 1);

    const slippageAmount = div(value, slippage);

    const receivedAmount = value - slippageAmount;

    if (inp < Number(config.minTokenValue)) {
      // console.log(`Token amount must greater or at least minimum equal ${config.minTokenValue}`);
      return { amount: 0, amountWithSlipapge: 0 };
    }

    return { amount: inp, amountWithSlipapge: receivedAmount };
  }

  return { amount: 0, amountWithSlipapge: 0 };
};

export const calcAddLiquidityRecipientValue = (pool: Pool, quoteAmount: number, tokenAmount: number) => {
  const user_provided_remaining_lbtc_supply = quoteAmount;

  const user_provided_remaining_lbtc_supply_16 = Math.floor(user_provided_remaining_lbtc_supply / 16);

  const pool_lp_supply = Number(pool.lp.value);
  const pool_lp_circulation = 2000000000 - pool_lp_supply;
  const mul_circ = user_provided_remaining_lbtc_supply_16 * pool_lp_circulation;
  const pool_lbtc_supply = Number(pool.quote.value);
  const pool_lbtc_supply_down = Math.floor(pool_lbtc_supply / 16);

  const user_lp_receiving_1 = Math.floor(mul_circ / pool_lbtc_supply_down);

  const user_provided_token_supply = tokenAmount;

  const user_provided_token_supply_down = Math.floor(user_provided_token_supply / 2000000);
  const mul_circ2 = user_provided_token_supply_down * pool_lp_circulation;
  const pool_token_supply = Number(pool.token.value);
  const pool_token_supply_down = Math.floor(pool_token_supply / 2000000);

  const user_lp_receiving_2 = Math.floor(mul_circ2 / pool_token_supply_down);

  const user_lp_received = Math.min(user_lp_receiving_1, user_lp_receiving_2);

  const poolRate = user_lp_received / pool_lp_circulation;

  return { lpReceived: user_lp_received, poolRate };
};

export const calcRemoveLiquidityRecipientValue = (pool: Pool, valLp: number) => {
  const user_lp_input = valLp;
  const pool_lbtc_supply = Number(pool.quote.value);
  const pool_token_supply = Number(pool.token.value);
  const pool_lp_supply = Number(pool.lp.value);

  const pool_lbtc_supply_down = Math.floor(pool_lbtc_supply / 16);
  const mul_1 = user_lp_input * pool_lbtc_supply_down;
  const lp_circ = 2000000000 - pool_lp_supply;
  const div_1 = Math.floor(mul_1 / lp_circ);

  const user_lbtc_received = div_1 * 16;

  const pool_token_supply_down = Math.floor(pool_token_supply / 2000000);

  const mul_2 = user_lp_input * pool_token_supply_down;
  const div_2 = Math.floor(mul_2 / lp_circ);
  const user_token_received = div_2 * 2000000;

  return {
    user_lbtc_received,
    user_token_received,
  };
};

export const convertForLiquidityCtx = (value: number, pool: Pool, isToken = false): number => {
  if (isToken) {
    const tokenInput = value;

    const quotePoolAmount = Number(pool.quote.value);
    const tokenPoolAmount = Number(pool.token.value);

    const quoteOutput = div(tokenInput * quotePoolAmount, tokenPoolAmount);

    return quoteOutput;
  } else {
    const quoteInput = value;
    const quotePoolAmount = Number(pool.quote.value);
    const tokenPoolAmount = Number(pool.token.value);
    const tokenOutput = div(quoteInput * tokenPoolAmount, quotePoolAmount);
    return tokenOutput;
  }
};
