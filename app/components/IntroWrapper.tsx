// app/components/IntroWrapper.tsx

"use client";

import { useState, useEffect } from "react";
import IntroOverlay from "@/app/components/IntroOverlay";
import { IntroType } from "@/types";

export default function IntroWrapper({ intro }: { intro: IntroType }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (visible) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [visible]);

    return visible ? (
        <IntroOverlay intro={intro} onFinish={() => setVisible(false)} />
    ) : null;
}
