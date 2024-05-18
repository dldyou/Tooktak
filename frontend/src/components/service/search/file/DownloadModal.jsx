import Modal from "../../../commons/Modal";
import ProgressBar from "../../../commons/ProgressBar";

export default function DownloadModal({active, setActive}) {
    return <Modal body={<>
        <ProgressBar percent={50}/>
    </>}
                  onClose={() => {
                  }}
                  title={"Downloading..."}
                  active={active}
                  setActive={setActive}
    />
}