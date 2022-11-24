import { useForm } from "@/context/form"
import { MaterialInput, MaterialSelect } from "../../Input";

export default function General() {
    const { about, setAbout, url, setUrl, email, setEmail, location, setLocation, gender, setGender, birthday, setBirthday, occupation, setOccupation } = useForm();

    return <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div className="space-y-4">
                <MaterialInput placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <MaterialInput placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} required />
                <MaterialInput wrapper="textarea" placeholder="About" rows={5} value={about} onChange={e => setAbout(e.target.value)} required />
            </div>
            <div className="space-y-4">
                <MaterialInput
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <MaterialSelect
                    placeholder="Gender"
                    value={gender}
                    onChange={e => {
                        if (e.target.value === "I don't want to say") return setGender(null);
                        setGender(e.target.value)
                    }} options={[
                        "I don't want to say",
                        "He/Him",
                        "She/Her",
                        "They/Them",
                        "Other"
                    ]}
                />
                <MaterialInput type="date" placeholder="Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
                <MaterialInput placeholder="Occupation" value={occupation} onChange={e => setOccupation(e.target.value)} />
            </div>
        </div>
    </>
}