import './useful.css'
import {useCallback, useContext, useEffect, useState} from "react";
import UsefulService from "../../services/useful.service";
import {AuthContext} from "../../context/auth-context";
import {Link} from "react-router-dom";

const Useful = () => {

    const {token} = useContext(AuthContext);
    const [useful, setUseful] = useState([])

    const fetchUseful = useCallback(async () => {
        const fetched = await UsefulService.getAllUseful(token)
        setUseful(fetched.data)
    }, [])

    useEffect(fetchUseful, [])

    return (
        <section className="why-us">

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="mt-5 text-center">ПОЛЕЗНОЕ</h2>
                    <p className="mb-5 text-center">Здесь полезная для Инноватора информация. Сверху видео которые можно
                        свайпать влево (всего прогружено 3 видео). Внизу статьи которые можно свайпать вверх (всего
                        прогружено 10 статей). Чтобы посмотреть больше статей или видео нужно переходить по ссылкам “Все
                        видео” или “Все статьи”.
                    </p>
                    <br/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <div className="box-add">
                        <h4 className="text-center"><Link to="/add-edit-useful" style={{color: '#fff'}}>Добавить</Link></h4>
                    </div>
                </div>

                {useful.map(value => (
                    <div className="col-sm-6 col-lg-3" key={value.id}>
                        <div className="box">
                            <span>{value.id}</span>
                            <h4><Link to={'/view-useful/' + value.id}>{value.title}</Link></h4>
                            <p>{value.description.slice(0, 30)}...</p>
                            <img src={value.imageUrl} alt=""/>
                        </div>
                    </div>
                ))}

            </div>

        </section>
    )
}

export default Useful