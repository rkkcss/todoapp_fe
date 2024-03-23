import { Button, Card, CardBody, CardHeader, Input, Text } from '@chakra-ui/react'
import { FieldValues, useForm } from 'react-hook-form';
import { UserStore } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ChangeNameDTO, updateNameInfos, User } from '../redux/userSlice';
import { PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';

export const EditUserInfo = () => {
    const dispatch: ThunkDispatch<User, User, PayloadAction> = useDispatch();
    const { user } = useSelector((state: UserStore) => state.userStore);

    const formData: ChangeNameDTO = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
    }

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({ defaultValues: formData });



    useEffect(() => {
        if (formData) {
            reset(formData);
        }
    }, [])

    const handleUserInfo = (data: FieldValues) => {
        dispatch(updateNameInfos(data));
    }
    return (
        <Card className='max-w-[800px] mx-auto mb-4'>
            <CardHeader>
                <h1 className='text-xl font-bold'>Edit user info</h1>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(handleUserInfo)} className='flex gap-6 flex-col'>
                    <div>
                        <Text mb='8px'>Firstname:</Text>
                        <Input type="text" placeholder="Firstname..."
                            {...register("firstName", {
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
                    </div>
                    <div>
                        <Text mb='8px'>Lastname:</Text>
                        <Input type="text" placeholder="Lastname..."
                            {...register("lastName", {
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
                    </div>
                    <div className='mt-4 text-right'>
                        <Button colorScheme="purple" type="submit">Save</Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}