import '../styles/Home.scss'
import {Link} from "react-router-dom";

const Home = () => {
    return (
            <div className={'home'}>
                <div className={'homeContent'}>
                    <div id={'homeTitle'}>Evolution of Life</div>
                    <Link to={'/info1'}><div id={'homeBtn'}>Play</div></Link>
                </div>
                <div className={'homeFooter'}>
                    <div>made with Love By @tanmayVaish</div>
                </div>
            </div>
    )
}
export default Home;