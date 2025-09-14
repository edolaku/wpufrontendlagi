import PageHead from "@/components/commons/PageHead"
import { Fragment, ReactNode } from "react"

interface PropTypes {
    children: ReactNode;
    title?: string;
}

const AuthLayout = (props: PropTypes) => {
    const { children, title, } = props;
    return (
        <Fragment>
            <PageHead title={title} />
            {/* jika lebih dari 3xl maka berikan container */}
            <section className="max-w-screen-3xl 3xl:container p-6">
                {children}
            </section>
        </Fragment>
    )
};

export default AuthLayout