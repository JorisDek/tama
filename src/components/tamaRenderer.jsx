import React from "react";
// cards
import { parts } from "../parts/parts";
import _r1 from "../assets/images/rarity/_rarity_1.png";
import _r2 from "../assets/images/rarity/_rarity_2.png";
import _r3 from "../assets/images/rarity/_rarity_3.png";

const TamaRenderer = ({ tama = null, size = 200, style }) => {
    if (!tama) {
        return null;
    }
    let rarity = _r1;

    if (tama.rarity >= 80) {
        rarity = _r2;
    }
    if (tama.rarity >= 95) {
        rarity = _r3;
    }

    let dnaStr = String(tama.dna);

    while (dnaStr.length < 16) dnaStr = "0" + dnaStr;

    let tamaDetails = {
        bg: dnaStr.substring(0, 2) % 5,
        mask: dnaStr.substring(2, 4) % 5,
        line: dnaStr.substring(4, 6) % 5,
        addon: dnaStr.substring(6, 8) % 5,
        addonMouth1: dnaStr.substring(8, 10) % 5,
        addonMouth2: dnaStr.substring(10, 12) % 5,
        addonMouth3: dnaStr.substring(12, 14) % 5,
        name: tama.name,
    };

    const tamaStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
    };

    return (
        <div
            style={{
                minWidth: size,
                minHeight: size,
                background: "blue",
                position: "relative",
                ...style,
            }}
        >
            <img alt={"bg"} src={parts.bg[tamaDetails.bg]} style={tamaStyle} />
            <img alt={"mask"} src={parts.mask[tamaDetails.mask]} style={tamaStyle} />
            <img alt={"line"} src={parts.line[tamaDetails.line]} style={tamaStyle} />
            <img alt={"addon"} src={parts.addon[tamaDetails.addon]} style={tamaStyle} />
            <img
                alt={"addon_mouth"}
                src={parts.addonMouth1[tamaDetails.addonMouth1]}
                style={tamaStyle}
            />
            <img
                alt={"addon_mouth"}
                src={parts.addonMouth2[tamaDetails.addonMouth2]}
                style={tamaStyle}
            />
            <img
                alt={"addon_mouth"}
                src={parts.addonMouth3[tamaDetails.addonMouth3]}
                style={tamaStyle}
            />
            <img alt={"rarity"} src={rarity} style={tamaStyle} />
        </div>
    );
};

export default TamaRenderer;
