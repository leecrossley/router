import React from 'react';

const Defs = () => <defs>
    <filter xmlns="http://www.w3.org/2000/svg" id="dropshadow" height="150%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.3"/>
        <feOffset dx="0" dy="0.5" result="offsetblur"/>
        <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/>
        </feComponentTransfer>
        <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
    </filter>
</defs>

export default Defs;
