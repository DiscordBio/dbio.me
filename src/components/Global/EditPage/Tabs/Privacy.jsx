import { useForm } from "@/context/form"
import { MaterialInput, MaterialSelect } from "../../Input";
import { Switch } from '@headlessui/react'
import Button from "../../Button";
import AnswerModal from "../../AnswerModal";

export default function Privacy() {
    const { isShow, isPrivateEmail, isPrivateBirthday, isPrivateLocation, isPrivateGender, setIsShow, setIsPrivateEmail, setIsPrivateBirthday, setIsPrivateLocation, setIsPrivateGender } = useForm();


    let privacyOptions = [
        {
            id: 1,
            name: "Show Profile",
            description: "If you disable this, your profile will be hidden from the public.",
            value: isShow,
            setValue: setIsShow
        },
        {
            id: 2,
            name: "Private Email",
            description: "If you enable this, your email will be hidden from the public.",
            value: isPrivateEmail,
            setValue: setIsPrivateEmail
        },
        {
            id: 3,
            name: "Private Birthday",
            description: "If you enable this, your birthday will be hidden from the public.",
            value: isPrivateBirthday,
            setValue: setIsPrivateBirthday
        },
        {
            id: 4,
            name: "Private Location",
            description: "If you enable this, your location will be hidden from the public.",
            value: isPrivateLocation,
            setValue: setIsPrivateLocation
        },
        {
            id: 5,
            name: "Private Gender",
            description: "If you enable this, your gender will be hidden from the public.",
            value: isPrivateGender,
            setValue: setIsPrivateGender
        }
    ];


    return <>
        <div className="grid grid-cols-1  gap-4 w-full">
            <div className="space-y-4">

                {privacyOptions.map((option, index) => {
                    return <div key={index} className="flex items-center justify-between hover:bg-zinc-600/5 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer" onClick={() => option.setValue(!option.value)}>
                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-lg font-semibold">{option.name}</h3>
                                <Switch
                                    checked={option.value}
                                    onChange={option.setValue}
                                    className={`${option.value ? 'bg-primary' : 'bg-gray-500'
                                        } relative inline-flex lg:hidden h-6 w-11 items-center rounded-full transition-colors duration-300`}
                                >
                                    <span className="sr-only">Enable notifications</span>
                                    <span
                                        className={`${option.value ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                                    />
                                </Switch>
                            </div>
                            <p className="mt-2 lg:mt-0 text-sm text-gray-500">{option.description}</p>
                        </div>
                        <Switch
                            checked={option.value}
                            onChange={option.setValue}
                            className={`${option.value ? 'bg-primary' : 'bg-gray-500'
                                } hidden relative lg:inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300`}
                        >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${option.value ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                            />
                        </Switch>
                    </div>
                })}
            </div>
        </div>
    </>
}