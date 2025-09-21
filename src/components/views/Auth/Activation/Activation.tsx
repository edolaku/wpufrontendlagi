import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router";


interface PropTypes {
    status: 'success' | 'failed'
}

const Activation = (props: PropTypes) => {
    const router = useRouter();
    const { status } = props;
    
    return (
        <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />

                <Image
                    src={
                        // jika status success maka gambar yg dirender adalah success.svg
                        // jika status failed maka gambar yg dirender adalah pending.svg:
                        status === 'success'
                            ? '/images/illustration/success.svg'
                            : '/images/illustration/pending.svg'
                    }
                    alt="success"
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold text-danger-500">
                    {
                        // jika status success maka tulisan yg dirender adalah Create Account Success
                        // jika status failed maka tulisan yg dirender adalah Create Account Failed
                        status === 'success'
                            ? 'Activation Account Success'
                            : 'Activation Account Failed'
                    }
                </h1>
                <p className="text-xl font-bold text-default-500">
                    {
                        // jika status success maka tulisan yg dirender adalah Thank you for your registration
                        // jika status failed maka tulisan yg dirender adalah Confirmation code is invalid
                        status === 'success'
                            ? 'Thank you for your registration'
                            : 'Confirmation code is invalid'
                    }
                </p>
            </div>
            <Button
                className="mt-4 w-fit"
                variant="bordered"
                color="danger"
                onPress={() => router.push('/')}
            >Back to Home</Button>
        </div>
    )
}

export default Activation