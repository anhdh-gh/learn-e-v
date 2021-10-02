import '../assets/styles/CeStudySetPage.css'
import { useParams } from "react-router-dom";

const CeStudySetPage = (props) => {
    let { slug } = useParams()

    console.log(slug)

    return <div>
        <header className="mt-5">
            <p>Tạo học phần mới {slug}</p>
        </header>
    </div>
}

export default CeStudySetPage