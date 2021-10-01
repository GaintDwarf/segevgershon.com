import Me from '~/assets/images/main-avatar.png';
import { get_random_item } from '~/util';
import React, { useRef , useState, useLayoutEffect } from 'react';
import './avatar.css';

const containerStyle = {
    maxHeight : "60vh",
    marginTop : "5vh",
    marginBottom : "10vh",
    marginLeft: "auto",
    marginRight: "auto",

    position: "relative",
    align: "center",

    width:  "33vh",
    height: "60vh",

    maxWidth: "100%"
};

const avatarStyle = {
    zIndex: "100",
    top:    "20%",
    left:   "15%",
    position: "absolute",
};

const gradients = [
    // "#000428, #004e92", // Frost
    // "#02aab0, #00cdac", // Green Beach
    "#eecda3, #ef629f", // Tranquil
    "#7b4397, #dc2430", // Virgin America
    "#43cea2, #185a9d", // Endless River
    "#ff512f, #dd2476", // Bloody Mary
    "#ff5f6d, #ffc371", // Sweet Morning
    "#c33764, #1d2671", // Celestial
    "#141e30, #243b55", // Royal
    "#3a1c71, #d76d77, #ffaf7b", // Relay
];

const aurora = {
    zIndex: "1",
    top:    "0",
    left:   "0",
    position: "absolute",

    width:      "100%",
    paddingTop: "100%",

    backgroundImage: `radial-gradient(
        at top left,
        ${get_random_item(gradients)}
        )`,
};

function useDimensions (ref) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        const getDimensions = () => ({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
        });

        const handleResize = () => {
            setDimensions(getDimensions());
        }

        if (ref.current) {
            setDimensions(getDimensions());
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [ref, ref?.current?.offsetWidth]);

    return dimensions;
};

function find_adjacent_width(container_width, item_width, max_delta, diff) {
    if (container_width % item_width <= max_delta) {
        return item_width;
    }
    return find_adjacent_width(container_width,
                               item_width + diff,
                               max_delta,
                               diff);
}

function Avatar() {
    const aurora_bg =  useRef(null);
    const { width, height } = useDimensions(aurora_bg);

    // TODO: find minimal, between diff = 1 and diff = -1
    const item_width = find_adjacent_width(width, 25, 2, 1);
    const item_offsets = () => ([...[...Array(Math.ceil(width / item_width))
                                .keys()]
                                .map(i => `${i * item_width}px`)]);
    const max_height = 90;
    const min_height = 6 / 4; // In percentage

    const index_to_height = index =>
        max_height - (index / (width / item_width)) * max_height / min_height;

    return (
        <div style={ containerStyle }>
            <div style={ aurora } ref={ aurora_bg }> </div>
            { item_offsets().map((value, index) => {
                return <div className="aurora-line-container"
                            key={ `aurora-line-${index}` }
                            style={{ "left":value,
                                     "width":`${item_width}px`,
                                     "height":`${height}px` }}>
                        <div className="aurora-line"
                             style={{ "height":`${index_to_height(index)}%` }}>
                        </div>
                    </div>
            })}
            <img style={ avatarStyle } alt="Failed to load avatar" src={ Me }/>
        </div>
    );
}

export default Avatar;
