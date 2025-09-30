'use client'

import {useGetItemsQuery} from "services/api";

// export default function Home() {
//   const { data, error, isLoading } = useGetItemsQuery();
//   console.log("DATA>>>>", data)
//
//   if (isLoading) return <div>Загрузка...</div>
//   if (error) return <div>Ошибка при загрузке</div>
//
//   return (
//       <div>
//         <h1>Данные с API:</h1>
//         {data?.map((item: any, index: number) => (
//             <div key={index} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
//               {JSON.stringify(item)}
//             </div>
//         ))}
//       </div>
//   )
// }

import React from 'react'
import HeaderTimer from "@/app/components/HeaderTimer";
import TariffCard from "@/app/components/TariffCard";
import "./page.css"

export default function Page() {
    const {data: tariffs, error, isLoading} = useGetItemsQuery()
    const [isDiscountActive, setDiscountActive] = React.useState(true)
    const [selectedId, setSelectedId] = React.useState<string | null>(null)
    const [agreeChecked, setAgreeChecked] = React.useState(false)
    const [buyError, setBuyError] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (tariffs && tariffs.length && selectedId === null) {
            const best = tariffs.find(t => t.is_best)
            setSelectedId(best ? best.id : tariffs[0].id)
        }
    }, [tariffs, selectedId])

    const onExpire = () => setDiscountActive(false)

    const handleBuy = (tariffId: string) => {
        if (!agreeChecked) {
            setBuyError('Необходимо подтвердить соглашение')
            return
        }
        setBuyError(null)
        alert(`Купить тариф ${tariffId}`)
    }

    if (isLoading) return <div className="pt-[120px]">Загрузка...</div>
    if (error) return <div className="pt-[120px]">Ошибка при загрузке</div>

    return (
        <div className="min-h-screen bg-[#0f1720] text-white">
            <HeaderTimer startSeconds={959} onExpire={onExpire}/>

            <main className="container">
                <div className="text-and-tariff">
                    <div className="text">
                        Выбери подходящий для себя <span className="text-tariff">тариф</span>
                    </div>
                </div>


            <div className="grid">
                {/*<div className="grid gap-6 grid-cols-1 md:grid-cols-3">*/}
                {tariffs?.map((t, idx) => (
                    <TariffCard
                        key={`${t.id}-${idx}`}
                        tariff={t}
                        isDiscountActive={isDiscountActive}
                        selected={selectedId === t.id}
                        onSelect={() => setSelectedId(t.id)}
                        onBuyClick={handleBuy}
                        showBig={t.is_best}
                    />
                ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
                <label className={`flex items-center gap-2 ${buyError ? 'text-red-400' : ''}`}>
                    <input
                        type="checkbox"
                        checked={agreeChecked}
                        onChange={(e) => {
                            setAgreeChecked(e.target.checked);
                            setBuyError(null)
                        }}
                        className={`w-4 h-4 rounded ${buyError ? 'ring-2 ring-red-400' : ''}`}
                    />
                    <span className="text-sm">Согласен с условиями</span>
                </label>

                <button
                    onClick={() => selectedId && handleBuy(selectedId)}
                    className="ml-auto px-6 py-2 rounded bg-yellow-500 text-black font-semibold hover:opacity-90"
                >
                    Купить выбранный
                </button>
                {buyError && <div className="text-red-400 text-sm ml-4">{buyError}</div>}
            </div>

            <div className="mt-8 text-sm text-gray-300">
                Примечание: при окончании таймера скидочные цены исчезнут и останутся полные цены.
            </div>
        </main>
</div>
)
}

