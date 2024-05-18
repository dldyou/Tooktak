export default function ProgressBar({percent}){
    return <progress value={percent} className="progress is-primary" max="100">{percent}</progress>
}