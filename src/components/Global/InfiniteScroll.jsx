import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { request } from "@/utils/apiHandler";

export default function InfiniteScrollComponent({
    url: Url,
    children,
    container = "",
    upperContainer = "",
    onNoData: NoData = () => { return null; },
    render = () => { return null; },
    dataPath = ["data"],
    filterNoData = true,
    preRenderCount = 0,
    preRender = () => { return null; },
    itemsCount = 10,
}) {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(Url);

    const getMoreData = async (URL) => {
        const res = await request((URL || url).replace("%s", 1), "GET");
        let path = res;

        for (let i = 0; i < dataPath.length; i++) {
            path = path?.[dataPath[i]] || [];
        }

        if (path.length < itemsCount) setHasMore(true);

        setItems(path);
        setLoading(false);
    };

    const ParseUrl = (url) => {
        let newUrl = url;
        let queries = router.query;

        function ChangeQuery(query, value) {
            if (newUrl.includes(`${query}`)) {
                newUrl = newUrl.replace(/query=\d+/, `${query}=${value}`);
            } else {
                newUrl = newUrl + `&${query}=${value}`;
            }
        }

        for (let i = 0; i < Object.keys(queries).length; i++) {
            const key = Object.keys(queries)[i];
            const value = queries[key];
            if (key === "page" || key === "limit") return;
            ChangeQuery(key, value);
        }
        
        return newUrl;
    }


    const handleRouteChange = () => {
        setHasMore(true);
        setPage(2);
        setLoading(true);
        setItems([]);
        setUrl(ParseUrl(Url));
        setTimeout(() => {
            getMoreData(ParseUrl(Url));
        }, 100);
    };


    useEffect(() => {
        if (Url !== url) {
            setUrl(Url);
            handleRouteChange();
        }
    }, [Url]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getMoreData();
        }, 100);
    }, []);

    const fetchData = async () => {
        const res = await request(url.replace("%s", page), "GET");
        const data = res;

        let path = data;
        for (let i = 0; i < dataPath.length; i++) {
            path = path?.[dataPath[i]] || [];
        }

        return path;
    };

    const fetchMore = async () => {
        const data = await fetchData();

        if (data.length >= 1) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setItems([...items, ...data]);
                if (data.length === 0) {
                    return setHasMore(false);
                }
                setPage(page + 1);
            }, 100);
        } else {
            setHasMore(false);
        }
    };

    return <>
        <div className={upperContainer}>
            <InfiniteScroll
                dataLength={items?.length || 0}
                next={fetchMore}
                hasMore={hasMore}
            >
                <div className={container}>
                    {loading && items.length === 0 ? (
                        Array.from(Array(preRenderCount).keys()).map((e, i) => {
                            return preRender(e, i);
                        })
                    ) : (
                        <>
                            {items.filter(e => {
                                if (filterNoData === true) {
                                    return e;
                                } else if (filterNoData === false) {
                                    return !e;
                                } else {
                                    return e[filterNoData];
                                }
                            }).map((item, index) => (
                                render(item, index)
                            ))}
                            {items.filter(e => e[filterNoData]).length === 0 && <NoData />}
                            {loading && Array.from(Array(preRenderCount).keys()).map((e, i) => {
                                return preRender(e, i);
                            })}
                        </>
                    )}
                </div>
            </InfiniteScroll>
        </div >
    </>
}