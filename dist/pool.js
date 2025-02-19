"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCovenants = exports.bodyCalculaterN = exports.bandwithArray = exports.lpFeeTiers = void 0;
var wiz_data_1 = __importStar(require("@script-wiz/wiz-data"));
var lib_1 = require("@script-wiz/lib");
var lib_core_1 = require("@script-wiz/lib-core");
exports.lpFeeTiers = {
    "%0.10": 1000,
    "%0.15": 666,
    "%0.20": 500,
    "%0.25": 400,
    "%0.30": 333,
    "%0.35": 285,
    "%0.40": 250,
    "%0.45": 222,
    "%0.50": 200,
    "%0.55": 181,
    "%0.60": 160,
    "%0.65": 153,
    "%0.70": 142,
    "%0.75": 133,
    "%0.80": 125,
    "%0.85": 117,
    "%0.90": 111,
    "%0.95": 105,
    "%1.00": 100,
};
exports.bandwithArray = [
    145,
    354,
    627,
    964,
    1365,
    1830,
    2359,
    2952,
    3609,
    4330,
    5115,
    5964,
    6877,
    7854,
    8895,
    10000,
    10500,
    11000,
    11500,
    12000,
    12500,
    13000,
    13500,
    14000,
    14500,
    15000,
    15500,
    16000,
    16500,
    17000,
    17500,
    18000,
    18500,
    19000,
    19500,
    20000,
    20500,
    21000,
    21500,
    22000,
    22500,
    23000,
    23500,
    24000,
    24500,
    25000,
    25500,
    26000,
    26500,
    27000,
    27500,
    28000,
    28500,
    29000,
    29500,
    30000,
    30500,
    31000,
    31500,
    32000,
    32500,
    33000,
    33500,
    34000, // n = 63
];
// export const bodyCalculaterN = (n: number, flagAssetId: string) => {
//   let body = "";
//   let header = "";
//   const reversedFlagAssetId = hexLE(flagAssetId);
//   for (let i = 0; i <= n; i++) {
//     const genericHeaderStart = "6b".repeat(i * 2);
//     const genericHeaderEnd = "6c".repeat(i * 2);
//     const headerStaticValue = "7e7e7e7e7e7c";
//     const genericBody =
//       "567a766e6e6eaa76" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c701008804010000008888" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c7010088040200000088888202a201885180528855517f5288012a557f0500ffffffff880153557f0500ffffffff880158517f5488028400547f04516a4c4e88028800014e7f76012080567988760120517f7c76012101217f7c760142587f7c014a547fe2e1577976518000c8697e51795101187f7e54797e7c0119527f7e5679a8767e01c47e015c7e7c7ea85579a8767e58797e7c7ea85a7a" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ca6976" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ca69887e7c5879e46c6c5279936b51797651a2696ea0636d6788" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c76d5880" +
//       compileData(WizData.fromNumber(i + 2).hex) +
//       "c76d5880dd6968527aa9" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "d1008888" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c86953c869886c6c6c6c00cb76" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cb88" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cb88" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "d10088" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "d1008888567a765187637553c869" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c86988" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c969" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c969d769557902bc0293e0d8697602e803e0df69766b7602f401e0da6977d8695179d76960e0da6977517960e0da6977537951c96953c969da697760e0d96951e0d769da6977d9697cda697751c96953c969da697760e0d96951e0d769d96952797cd86951c96953c969da69770120e0d96951e0d769d869567a5179dd637651c86976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce698852e0da6976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf6988d769" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf69887c6cd769527a527ad8697c6753c86976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce69886c52e0da6976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf6988d769" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf69887568677652876375" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c969557902bc0293e088" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c86951c86988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c969760132e0df69766b7602f401e0da6977d8695279d76951c96953c969da697760e0d96951e0d769da6977517960e0da6977537951c96953c969da697760e0d96951e0d769da6977d9697cda697760e0d96951797cd8690120e0d869567a5179dd517902e803e0dc63750068637652e0da6953c86976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce698876" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf6988d769" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf6988d869517a6cd7697c6751c86976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce69886c52e0da6976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf6988d769" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf69887568677653876375" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c969557902bc0293e0d8697602e803e0df697660e0da69770400943577e05579d869766bd969527960e0da6977da6977" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c86951c86988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c969760480f0fa02e0df697651c96953c969da697760e0d96951e0d769da69776cd969557951c96953c969da697760e0d96951e0d769da6977da6977527a6edf637767756852c86976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce69887652e0da6976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf6988d769" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf6988557a7cd869547a527ad769537a537ad769557a75677654876375" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "c969557902bc0293e088" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c86952c86988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "c969765ae0df69766b517960e0da6977d9690400943577e05479d869766bda697760e0d96976" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "cf698853c869" +
//       compileData(WizData.fromNumber(i + 4).hex) +
//       "ce69886c6c766b547951c96953c969da69777651e0df6960e0d969da6977d9697cda697751c96953c969da69777651e0df6960e0d969d96976" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "ce6951ce6988" +
//       compileData(WizData.fromNumber(i + 5).hex) +
//       "cf69886c557ad769547a527ad869537a537ad869557a75676a686868686b6b6b6b6b";
//     body += genericBody;
//     header += genericHeaderStart + headerStaticValue + genericHeaderEnd;
//   }
//   const headerPart1 = header;
//   const headerPart2 =
//     "20" +
//     reversedFlagAssetId +
//     "1b20766b6b6351b27500c8696c876700c8696c87916960b27521ac68201dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624105461704c6561662f656c656d656e747311546170547765616b2f656c656d656e747300c869557988cd5388d4" +
//     compileData(WizData.fromNumber(2 * n + 6).hex) +
//     "88d5" +
//     compileData(WizData.fromNumber(2 * n + 8).hex) +
//     "8853c9696b51c9696b52c9696b006b04ffffff7f6b";
//   const finalHeader = headerPart1 + headerPart2;
//   const footer =
//     "6d6d756c756ce0" +
//     compileData(WizData.fromNumber(bandwithArray[n]).hex) +
//     "e0d769d58c767676cf69547a88d14f8800a888ce6953ce69888c76d1008814972ca4efa6bac21a771259e77dafabeeb0acbfe088ce6953ce69886c52cf69886c51cf69886c53cf698800ca6900d1698851ca6951d1698852ca6952d1698853ca6953d1698800c86900ce698851c86951ce698852c86952ce698853c86953ce6988040100000076767600cb8851cb8852cb8853cb88d2040200000088d3040000000087";
//   return finalHeader + body + footer;
// };
// export const createCovenants = (leafCount: number, lookupLeafIndex: number, flagAssetId: string) => {
//   const mainCovenantScript: string[] = [];
//   for (let i = 0; i <= leafCount; i++) {
//     mainCovenantScript.push(bodyCalculaterN(i, flagAssetId));
//   }
//   const pubKey = WizData.fromHex("1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624");
//   const scriptsWizData = mainCovenantScript.map((mcs) => WizData.fromHex(mcs));
//   const controlBlock = taproot.controlBlockCalculation(scriptsWizData, "c4", pubKey.hex, lookupLeafIndex);
//   const taprootResult = taproot.tapRoot(pubKey, scriptsWizData, TAPROOT_VERSION.LIQUID);
//   return { mainCovenantScript, controlBlock, taprootResult };
// };
var bodyCalculaterN = function (n, flagAssetId, pair1Coefficient, lpFeeTierIndex) {
    if (pair1Coefficient === void 0) { pair1Coefficient = 50; }
    if (lpFeeTierIndex === void 0) { lpFeeTierIndex = 2; }
    var body = [];
    var reversedFlagAssetId = (0, wiz_data_1.hexLE)(flagAssetId);
    var lpFeeTiersValues = Object.values(exports.lpFeeTiers);
    for (var i = 0; i <= n; i++) {
        var genericBody = [
            "6b766b7ed3c6a86c6c7c7e76014a547f7c760142587f7c76012101217f7c760120517f7c01208000c869886c6c6c6c6c6c6c6c6c6c6c5f7a76765d7976cb00cb88c7010088d388885c798b76cb00cb88c701008800cb88885c795387635b79529376cb00cb88c7010088d288886775685579a8767e02c4447e597976548000c8697e517954597f7e5f79a97e770388ac687e7ea85779a8767e5979527a7e7ea85b79ca6976765e798bca69885e795387635d795293ca698867756801117a7c7e7c5979e45e7ae2e17651a26976537a6e9f636d679d5a7976c7757558807c5294c775755880dd696876527a935a7976c869d58cce6988c969527902bc0293e0885c7aa95a79d1008888",
            (0, lib_1.compileData)(wiz_data_1.default.fromNumber(pair1Coefficient).hex),
            "e054795479da69777600e087637553795579da697751797cda6977675179d969687600e0dd637551e0685d7a76518763755c798b76c86953c86988c969766b7651e0df6976",
            (0, lib_1.compileData)(wiz_data_1.default.fromNumber(lpFeeTiersValues[lpFeeTierIndex]).hex),
            "e0da6977d8695579d7695279da697755795379da697757795379da6977d9697cda69775179d96956797cd869517952e0d969d8695e7a5179dd517953795ae0d969dc637500686c766b5779de63750068635c7976ce6951c86988cf69766b886d6c6c527a6b527a6b527ad7696bd8696b675c7976ce6953c86988cf696c88756d6b6b6b6b686b6b6b6b6b8b6b52936b6776528763755c798b76c86951c86988c969766b7651e0df6976",
            (0, lib_1.compileData)(wiz_data_1.default.fromNumber(lpFeeTiersValues[lpFeeTierIndex]).hex),
            "e0da6977d8695679d7695179da697755795379da697757795379da6977d9697cda69775279d96955797cd869527952e0d969d8695e7a5179dd517954795ae0d969dc637500686c766b5879de63750068635c7976ce6953c86988cf69766b886d6c6c527a6b527a6b527a527ad8696bd7696b675c7976ce6951c86988cf696c88756d6b6b6b6b686b6b6b6b6b8b6b52936b6776538763755c798b76c86953c86988c9697651e0df69765379da69770400943577e05979d869766bd96956795479da6977da69775e79529376c86951c86988c9697651e0df69765479da69776cd96959795579da6977da6977527a6edf6377677568607a6edf527951e0dc637500686375765f7976ce6952ce6988cf6988557a6b557a6b557a537ad7696b547a527ad7696b537a7cd8696b6d6b6b6b6b8b676d7c5d79768bd100885179d100888876ce6953c869888bce6951c869885d7976cf69527a888bcf69886d6b6b6b6b6b6b6b6b6b5293686b53936b675487635c798b76c86952c86988c9697651e0df69766b55795379da6977d9690400943577e05879d869766bda69775279d9696c6c766b58795479da6977d9697cda69775279d9697653795ae0d969df527955795ae0d969dc63750068635d7976768bd100887cd10088887676ce6953c86988cf695379888b76ce6951c86988cf695179886c557a6b557a6b557a537ad8696b547a527ad8696b537ad7696b6d6b6b6b6b5293676d6d597976ce6952c86988cf696c886b6b6b6b6b6b6b6b6b8b686b52936b75676a68686868",
        ];
        body = __spreadArray(__spreadArray([], body, true), genericBody, true);
    }
    var header = [
        "54540d00c86920876351675ab276a914201dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f62411546170547765616b2f656c656d656e7473105461704c6561662f656c656d656e747352c96951c96953c96903404b4c006b6b6b6b6b6b6b6b6b6b6b",
    ];
    var footer = [
        "6cd4886c5293d5886c6c6d6c6c6d6c52cf69886c51cf69886c53cf69880401000000766e00cb8851cb8852cb8853cb8820",
        reversedFlagAssetId,
        "7600c8698800ce698800ca6900d1698851ca6951d1698852ca6952d1698853ca6953d1698851c86951ce698852c86952ce698853c86953ce69880402000000d2880400000000d388d58c7676d14f8800a888cf696c756ce0",
        (0, lib_1.compileData)(wiz_data_1.default.fromNumber(exports.bandwithArray[n]).hex),
        "e0d769888c7676ce697c8bce6988d1008814156e0dc932770529a4946433c500611b9ba7787188cd5387",
    ];
    return __spreadArray(__spreadArray(__spreadArray([], header, true), body, true), footer, true).join("");
};
exports.bodyCalculaterN = bodyCalculaterN;
var createCovenants = function (leafCount, lookupLeafIndex, flagAssetId, pair1Coefficient, lpFeeTierIndex) {
    var mainCovenantScript = [];
    for (var i = 0; i <= leafCount; i++) {
        mainCovenantScript.push((0, exports.bodyCalculaterN)(i, flagAssetId, pair1Coefficient, lpFeeTierIndex));
    }
    var pubKey = wiz_data_1.default.fromHex("1dae61a4a8f841952be3a511502d4f56e889ffa0685aa0098773ea2d4309f624");
    var scriptsWizData = mainCovenantScript.map(function (mcs) { return wiz_data_1.default.fromHex(mcs); });
    var controlBlock = lib_core_1.taproot.controlBlockCalculation(scriptsWizData, "c4", pubKey.hex, lookupLeafIndex);
    var taprootResult = lib_core_1.taproot.tapRoot(pubKey, scriptsWizData, lib_core_1.TAPROOT_VERSION.LIQUID);
    return { mainCovenantScript: mainCovenantScript, controlBlock: controlBlock, taprootResult: taprootResult };
};
exports.createCovenants = createCovenants;
//# sourceMappingURL=pool.js.map