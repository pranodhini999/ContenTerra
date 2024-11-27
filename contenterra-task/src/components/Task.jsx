import axios from "axios";
import { useEffect, useState } from "react";


const Task = () => {
    const [msg, setMsg] = useState([]); // Initialize state as an empty array

    useEffect(() => {
        axios
            .get("https://www.reddit.com/r/reactjs.json")
            .then((posRes) => {
                const posts = posRes.data?.data?.children?.map((item) => item.data) || [];
                setMsg(posts); // Set the extracted posts data
            })
            .catch((errRes) => {
                console.log(errRes);
            });
    }, []);

    return (
        <div className="responsive-container">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>SelfText_HTML</th>
                        <th>URL</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {msg.length > 0 ? (
                        msg.map((element, index) => (
                            <tr key={index}>
                                <td>{element.title || "N/A"}</td>
                                <td
                                    dangerouslySetInnerHTML={{
                                        __html: element.selftext_html || "N/A",
                                    }}
                                ></td>
                                <td>
                                    <a href={element.url} target="_blank" rel="noopener noreferrer">
                                        {element.url}
                                    </a>
                                </td>
                                <td>{element.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" align="center">
                                Loading...
                            </td>
                        </tr>
                    )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};

export default Task;
