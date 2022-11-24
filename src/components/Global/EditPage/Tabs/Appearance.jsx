import { useForm } from "@/context/form"
import useSWR from "@/hooks/useSWR";
import Dropinput from "../../Dropinput";
import { FileInput, MaterialMultiSelect, MaterialSelect } from "../../Input";

export default function Appearance() {
    const { banner, setBanner, avatar, setAvatar } = useForm();

    return <>
        <div className="grid grid-cols-1 gap-4 w-full">
            <FileInput type="avatar" placeholder="Avatar" value={avatar} setValue={setAvatar} />
            <FileInput type="banner" placeholder="Banner" value={banner} setValue={setBanner} />
        </div>
    </>
}
