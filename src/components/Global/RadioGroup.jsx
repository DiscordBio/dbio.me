import { memo, useCallback, useEffect, useState } from "react";
import { RadioGroup as HRadioGroup } from "@headlessui/react";

function RadioGroup(props) {
    const { className, label, items, value, onChange, ...rest } = props;

    return <HRadioGroup value={value}>
        <div className="space-y-2">
            {items.map((_, i) => (
                <HRadioGroup.Option
                    key={i}
                    value={i}
                    className={"relative flex cursor-pointer rounded-lg focus:outline-none group"}
                    onClick={useCallback(() => onChange({
                        ..._,
                        value: i
                    }), [onChange])}
                >
                    {({ active, checked }) => (
                        <>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                    <div className="-ml-2 mr-3 w-10 h-10 group-hover:bg-primary/10 transition-all duration-200 rounded-full flex items-center justify-center">
                                        <div className={`w-6 h-6 border-2 ${checked ? 'border-primary' : 'border-gray-600'} group-hover:border-primary transition-all duration-200 rounded-full flex flex-shrink-0 justify-center items-center`}>
                                            <div className={`w-4 h-4 rounded-full transition-all duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-transparent'}`} />
                                        </div>
                                    </div>

                                    <div className="text-sm">
                                        <HRadioGroup.Label as="p" className={`font-medium ${checked ? 'text-black dark:text-white' : 'text-gray-600 group-hover:text-gray-800 dark:group-hover:text-gray-400'} transition-all duration-200`}>
                                            {_?.label || i}
                                        </HRadioGroup.Label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </HRadioGroup.Option>
            ))}
        </div>
    </HRadioGroup>;
}

export default memo(RadioGroup);