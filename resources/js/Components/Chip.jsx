import React from "react";

const Chip = ({ val }) => {
    let color = "";

    switch (val) {
        case "out_of_stock":
            color = "dc4c64";
            break;

        case "ready":
            color = "069C56";
            break;

        default:
            color = "e4a11b";
            break;
    }
    console.log(val);

    return (
        <div
            data-te-chip-init
            data-te-ripple-init
            className={`
            bg-[#${color}] my-[5px] flex h-[32px] items-center justify-center rounded-[16px]  px-[6px] py-0 leading-loose text-[#000000]`}
            data-te-close="true"
        >
            <p className="text-[13px] font-bold normal-case">{val}</p>
        </div>
    );
};

export default Chip;
