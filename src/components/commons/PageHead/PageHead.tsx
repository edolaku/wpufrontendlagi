import Head from "next/head";


interface PropTypes {
    title?: string
}

const PageHead = (props : PropTypes) => {
    const {title = "WPU Frontend Lagi"} = props;
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    )
}

export default PageHead