"use client";
import { useEffect, useState } from "react";
import _JSXStyle from 'styled-jsx/style';
import { useConfig } from "./ConfigProvider";
import Head from "next/head";

export default function HeadCload() {
    const config = useConfig();
    const [loadjs, setLoadjs] = useState(false);

    useEffect(() => {
        const head = document.querySelector("head");
        let s: any = document.createElement('link');
        let _ex: any = document.getElementById('_cs');
        if (!_ex) {
            s.type = 'text/css';
            s.async = true;
            s.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Work+Sans:wght@400;500;600&amp;display=swap";
            s.rel = "stylesheet";
            s.id = "_cs";
            s.crossorigin = "anonymous";
            head?.appendChild(s);
        }
        if (config.activelang) {
            if (typeof window !== "undefined") {
                document.documentElement.lang = config?.activelang?.twoLetterIsoCode
            }
        }
        if (config?.header?.headjs) {
            if (typeof window !== "undefined") {
                if (!loadjs) {
                    const head = document.querySelector("head");
                    let s: any = document.createElement('script');
                    let _ex: any = document.getElementById('extra_headjs');
                    if (!_ex) {
                        s.type = 'text/javascript';
                        s.async = true;
                        s.innerHTML = config?.header?.headjs;
                        s.rel = "preload";
                        s.id = "extra_headjs";
                        head?.appendChild(s);
                    }
                    setLoadjs(true);
                }
            }
        }
    }, [config]);
    return (
        <>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_SERVER} />
            <Head>
                {config?.header?.head_css ?
                    config?.header?.head_css?.map((_cs: any) => {
                        const cssPath = "/css/" + _cs.public.split("/css/").pop();
                        return (
                            <link
                                key={cssPath}
                                rel="stylesheet"
                                href={cssPath}
                            />
                        );
                    })
                    : null}
            </Head>
            {config?.header?.head_i_css ?
                <_JSXStyle id="customstye">{`${config?.header?.head_i_css}`}</_JSXStyle>
                : null}
        </>
    )
}
