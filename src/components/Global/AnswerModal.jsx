import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import Button from "./Button";

export default function AnswerModal(props) {
    const { title, description, onConfirm, onDecline, children, ...rest } = props;
    let [isOpen, setIsOpen] = useState(false);
    let [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);
    return (
        <>
            <div onClick={toggleModal} {...rest}>
                {children}
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light dark:bg-dark p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6"
                                    >
                                        {title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2 w-full">
                                        <Button
                                            onClick={() => {
                                                if (onDecline) onDecline();
                                                setIsOpen(false);
                                            }}
                                            color="red"
                                            variant="ghost"
                                            className="!py-2 !px-4"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                if (onConfirm) onConfirm();
                                                setIsLoading(true);
                                                setTimeout(() => {
                                                    setIsOpen(false);
                                                    setIsLoading(false);
                                                }, 1000);
                                            }}
                                            color="dbio"
                                            variant="default"
                                            className={`!py-2 !px-4 ${isLoading ? "animate-pulse flex justify-center items-center" : ""}`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <i className="fas fa-spinner-third animate-spin" />
                                            ) : "Got it, thanks!"}
                                        </Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}