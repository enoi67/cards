import { useState, useEffect } from "react";
import './sorry.css'

const NewTask = () => {
    const [data, setData] = useState([]);
    const [titleInp, setTitleInp] = useState("")
    const [descInp, setDescInp] = useState("")
    const [subtitle, setSubTitle] = useState("")

    const url = 'https://66288b8554afcabd07361951.mockapi.io/products/prod'

    const postData = () => {
        fetch(url,{
            method: "POST",

            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                title: titleInp,
                desc: descInp,
                subtitle: subtitle
            })
            
        })
        .then((response) => response.json())
        .then((result) => setData([result, ...data]))
    }

    const addData = () => {
        postData()
    }

    const deleteItem = (id) => {
        fetch(`https://66288b8554afcabd07361951.mockapi.io/products/prod/${id}`, {
            method: "DELETE",
        })
    }

    const onDelete = (id) => {
        deleteItem(id);
        const newDta = data.filter((item) => item.id !== id)
        setData(newDta)
    }

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((result) => setData(result))
    }, [])

    return (
        <div>
            <div className="flex justify-center gap-1">
                <input type="text"  onChange={(e) => setTitleInp(e.target.value)} placeholder="title" className="border p-3"/>
                <input type="text"  onChange={(e) => setDescInp(e.target.value)} placeholder="description" className="border p-3"/>
                <input type="text"  onChange={(e) => setSubTitle(e.target.value)} placeholder="translate" className="border p-3"/>
                <div>
                    <button className="py-4 px-6 bg-green-700 text-white" onClick={addData}>Add</button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-[1400px] mx-auto mt-[65px]">
                {data.reverse().map((product) => (
                    <div key={product.id}>
                      <div class="flip-card">
                        <div class="flip-card-inner">
                        <button onClick={() => onDelete(product.id)} className="z-[999] py-1 px-3 bg-red-500 rounded-[50%] text-white absolute top-0 right-0">X</button>
                          <div class="flip-card-front">
                            <h1>{product.title}</h1>
                            <p>[{product.desc}]</p>
                          </div>
                          <div class="flip-card-back">
                            <h1>{product.subtitle}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default NewTask;