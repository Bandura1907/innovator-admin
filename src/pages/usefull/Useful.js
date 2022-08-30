import './useful.css'
import {useContext, useEffect, useState} from "react";
import UsefulService from "../../services/useful.service";
import {AuthContext} from "../../context/auth-context";
import {Link} from "react-router-dom";
import {BarWave} from "react-cssfx-loading";

const Useful = () => {

    const {token} = useContext(AuthContext);
    const [useful, setUseful] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(async () => {
        const fetched = await UsefulService.getAllUseful(token);
        setUseful(fetched.data);
        setLoading(false);
    }, []);


    return (
        loading ? <BarWave className="loaderBar"/> : <section className="why-us">

            <div className="tab">
                <div className="pd-20">
                    <ul className="nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active text-blue" data-toggle="tab" href="#home5" role="tab"
                               aria-selected="true">Статья</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-blue" data-toggle="tab" href="#profile5" role="tab"
                               aria-selected="false">Видео</a>
                        </li>

                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="home5" role="tabpanel">

                        <div className="pd-20">
                            <div className="row">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="box-add">
                                        <h4 className="text-center"><Link to="/add-edit-article"
                                                                          style={{color: '#fff'}}>+
                                            Статья</Link>
                                        </h4>
                                    </div>
                                </div>

                                {useful.articles?.map(value => (
                                    <div className="col-sm-6 col-lg-3" key={value.id}>
                                        <Link to={'/view-useful/' + value.id}>
                                            <div className="box">
                                                <span>{value.id}</span>
                                                <h4>{value.name}</h4>
                                                <p>{value.description.slice(0, 30)}...</p>
                                                <img src={value.pictureUrl} alt=""/>
                                            </div>
                                        </Link>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile5" role="tabpanel">
                        <div className="pd-20">
                            <div className="row">
                                <div className="col-sm-6 col-lg-3">
                                    <div className="box-add">
                                        <h4 className="text-center"><Link to="/add-edit-video" style={{color: '#fff'}}>+
                                            Видео</Link>
                                        </h4>
                                    </div>
                                </div>

                                {useful.videos?.map(value => (
                                    <div className="col-sm-6 col-lg-3" key={value.id}>
                                        <Link to={'/view-video/' + value.id}>
                                            <div className="box">
                                                <span>{value.id}</span>
                                                <h4>{value.name}</h4>
                                                <img src={value.pictureUrl} alt=""/>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default Useful