import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { createTask } from "../../queries/taskQueries";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateTaskModal = ({ isOpen, onClose }: Props) => {
  const submitForm = (data: FieldValues) => {
    createTask(data);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-4">
              <FormControl isRequired isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  {...register("title", {
                    required: "Kötelező mező!",
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters long!",
                    },
                    maxLength: {
                      value: 30,
                      message: "Maximum length is 30 characters!",
                    },
                  })}
                  placeholder="Title..."
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message as string}
                  </span>
                )}
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Desctiption</FormLabel>
                <Textarea
                  {...register("description", {
                    maxLength: {
                      value: 400,
                      message: "Maximum length is 400 characters!",
                    },
                  })}
                  placeholder="Description..."
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message as string}
                  </span>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Start time</FormLabel>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DateTimePicker
                      value={field.value}
                      locale="en-US"
                      onChange={(date) =>
                        field.onChange(moment(date).toISOString())
                      }
                      className="w-full outline outline-gray-200 outline-1 rounded-md text-gray-500"
                    />
                  )}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Finishing time</FormLabel>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DateTimePicker
                      value={field.value}
                      locale="en-US"
                      onChange={(date) =>
                        field.onChange(moment(date).toISOString())
                      }
                      className="w-full outline outline-gray-200 outline-1 rounded-md text-gray-500"
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <Button className="" colorScheme="purple" type="submit">
                Save
              </Button>
              <Button
                className=""
                variant="outline"
                colorScheme="purple"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
