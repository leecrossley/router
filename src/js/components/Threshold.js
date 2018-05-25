import Chartist from "chartist";

const createMasks = (data, options) => {
    const defs = data.svg.querySelector("defs") || data.svg.elem("defs");
    const projectedThreshold = data.chartRect.height()
        - data.axisY.projectValue(options.threshold) + data.chartRect.y2;

    const width = data.svg.width();
    const height = data.svg.height();

    defs.elem("mask", {
            x: 0,
            y: 0,
            width,
            height,
            id: options.maskNames.aboveThreshold
        })
        .elem("rect", {
            x: 0,
            y: 0,
            width,
            height: projectedThreshold,
            fill: "white"
        });

    defs.elem("mask", {
            x: 0,
            y: 0,
            width,
            height,
            id: options.maskNames.belowThreshold
        })
        .elem("rect", {
            x: 0,
            y: projectedThreshold,
            width,
            height: height - projectedThreshold,
            fill: "white"
        });

    return defs;
};

const Threshold = (options) => {
    return (chart) => {
        const defaultOptions = {
            threshold: 0,
            classNames: {
                aboveThreshold: "ct-threshold-above",
                belowThreshold: "ct-threshold-below"
            },
            maskNames: {
                aboveThreshold: "ct-threshold-mask-above",
                belowThreshold: "ct-threshold-mask-below"
            }
        };

        options = Chartist.extend({}, defaultOptions, options);

        if (chart instanceof Chartist.Line || chart instanceof Chartist.Bar) {
            chart.on("draw", data => {
                if (data.type === "point") {
                    data.element.addClass(
                        data.value.y >= options.threshold ? options.classNames.aboveThreshold : options.classNames.belowThreshold
                    );
                } else if (data.type === "line" || data.type === "bar" || data.type === "area") {
                    data.element
                        .parent()
                        .elem(data.element._node.cloneNode(true))
                        .attr({
                            mask: `url(#${options.maskNames.aboveThreshold})`
                        })
                        .addClass(options.classNames.aboveThreshold);

                    data.element
                        .attr({
                            mask: `url(#${options.maskNames.belowThreshold})`
                        })
                        .addClass(options.classNames.belowThreshold);
                }
            });

            chart.on("created", data => {
                createMasks(data, options);
            });
        }
    }
};

export default Threshold;
