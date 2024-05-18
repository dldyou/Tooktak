import {DropBox} from "../../../commons/DropBox";
import {useHospital, useHospitals} from "../../../../contexts/MetadataContext";

export default function Hospital() {
    const hospitals=useHospitals();
    const {hospital,setHospital} = useHospital();
    return <DropBox label="병원"
                    options={hospitals}
                    setValue={setHospital}
                    value={hospital}
    />
}
