import { Card, CardBody, Input } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"

const Register = () => {
    return (
        <div className="flex w-full flex-row items-center justify-center gap-20">
            <div className="flex w-1/3 flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />

                <Image
                    src="/images/illustration/login.svg"
                    alt="login"
                    width={1024}
                    height={1024}
                />
            </div>

            <Card>
                <CardBody className="p-8">
                    <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
                    <p className="text-small mb-4">
                        Have an account?&nbsp;
                        <Link href="/login" className="font-semibold text-danger-400">Login here</Link>
                    </p>
                    <form className="flex w-80 flex-col">
                        <Input
                            type="text"
                            label="Full Name"
                            variant="bordered"
                            autoComplete="off"
                        />

                        <Input
                            type="text"
                            label="Username"
                            variant="bordered"
                            autoComplete="off"
                        />

                        <Input
                            type="email"
                            label="Email"
                            variant="bordered"
                            autoComplete="off"
                        />

                        <Input
                            type="password"
                            label="Password"
                            variant="bordered"
                            autoComplete="off"
                            endContent={
                                
                            }
                        />  
                    </form>

                </CardBody>
            </Card>
        </div>
    )
}

export default Register