import { Button, Card, CardBody, CardHeader, FormControl, Input, Text } from "@chakra-ui/react"
import { FieldValues, useForm } from "react-hook-form";

export const EditEmail = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleEmailInfo = (data: FieldValues) => {
        console.log(data);
    }
    console.log(errors);

    return (
        <Card className='max-w-[800px] mx-auto'>
            <CardHeader>
                <h1 className='text-xl font-bold'>Edit e-mail</h1>
            </CardHeader>
            <CardBody>

                <form onSubmit={handleSubmit(handleEmailInfo)} className='flex gap-6 flex-col'>
                    <FormControl isInvalid={!!errors.currentEmail}>
                        <Text mb='8px'>Current e-mail:</Text>
                        <Input type="text" placeholder="Firstname..."
                            {...register("currentEmail", {
                                required: "Required field!",
                                minLength: {
                                    value: 3,
                                    message: "Must be at least 3 characters long!",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Maximum length is 30 characters!",
                                },
                            })}
                        />
                        {
                            errors.currentEmail &&
                            <Text color='red'>{errors.currentEmail.message as string}</Text>
                        }
                    </FormControl>
                    <FormControl isInvalid={!!errors.newEmail}>
                        <Text mb='8px'>New e-mail:</Text>
                        <Input type="text" placeholder="Lastname..."
                            {...register("newEmail", {
                                required: "Required field!",
                                minLength: {
                                    value: 3,
                                    message: "Must be at least 3 characters long!",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Maximum length is 30 characters!",
                                },
                            })}
                        />
                        {
                            errors.newEmail &&
                            <Text color='red'>{errors.newEmail.message as string}</Text>
                        }
                    </FormControl>
                    <div className='mt-4 text-right'>
                        <Button colorScheme="purple" type="submit">Save</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}