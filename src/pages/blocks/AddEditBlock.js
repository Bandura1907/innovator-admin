import {Link, Redirect, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/auth-context";
import BlocksService from "../../services/blocks.service";

const AddEditBlock = () => {

    const id = useParams().id;
    const {token} = useContext(AuthContext);
    const [index, setIndex] = useState("3");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(async () => {
       if (id) {
           const res = await BlocksService.getBlockById(token, id);
           setName(res.data.name);
           setDescription(res.data.description);

           if (res.data.products.type === "TECHNOLOGY")
               setIndex("0");
           else if (res.data.products.type === "DIGITAL")
               setIndex("1");
           else if (res.data.products.type === "INTERNET")
               setIndex("2");
           else if (res.data.products.type === "PHYSICAL")
               setIndex("3");
       }
    }, []);

    const saveBlock = async e => {
        e.preventDefault();

        if (id) {
            await BlocksService.editBlock(token, id, index, name, description);
            setRedirect(true);
        } else {
            await BlocksService.addBlock(token, index, name, description);
            setRedirect(true);
        }
        // console.log(index);
        // console.log(name);
        // console.log(description);
    }

    if (redirect){
        return <Redirect to="/blocks"/>
    }

    return <div className="main-container">
        <div className="pd-20 card-box mb-30">
            <form onSubmit={saveBlock}>
                <div className="clearfix">
                    <div className="pull-left">
                        {
                            id ?  <h4 className="text-blue h4">Редактировать блок</h4> :
                                <h4 className="text-blue h4">Добавить блок</h4>
                        }
                        <p className="mb-30">Введите информацию</p>
                    </div>
                    <div className="pull-right">
                        <Link to="/blocks">
                            <button type="button"
                                    className="btn btn-outline-danger btn-sm scroll-click m-2">Отмена
                            </button>
                        </Link>
                        <button type="submit" className="btn btn-primary btn-sm scroll-click" rel="content-y"
                                data-toggle="collapse">Сохранить
                        </button>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-12 col-md-2 col-form-label">Имя</label>
                    <div className="col-sm-12 col-md-10">
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-12 col-md-2 col-form-label">Описание</label>
                    <div className="col-sm-12 col-md-10">
                        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)}  required={true}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-12 col-md-2 col-form-label">Тип блока</label>
                    <div className="col-sm-12 col-md-10">
                        <select className="custom-select col-12" value={index} onChange={e => setIndex(e.target.value)}>
                            {/*<option defaultValue="user">Выбирете...</option>*/}
                            <option value="3">Физический</option>
                            <option value="2">Интерент</option>
                            <option value="1">Цыфровой</option>
                            <option value="0">Технология</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    </div>
};

export default AddEditBlock;

