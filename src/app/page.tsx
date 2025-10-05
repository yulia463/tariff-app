'use client'

import {useGetItemsQuery} from "services/api";
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
            alert('Необходимо подтвердить соглашение')
            return
        }
        setBuyError(null)
        alert(`Купить тариф ${tariffId}`)
    }

    if (isLoading) return <div className="pt-[120px]">Загрузка...</div>
    if (error) return <div className="pt-[120px]">Ошибка при загрузке</div>

    return (
        <div className="min-h-screen bg-[#232829] text-white">
            <HeaderTimer startSeconds={959} onExpire={onExpire}/>

            <div className="main-div">
                <div
                    className="
                        flex justify-start font-bold
                        pt-[20px] px-[16px]
                        text-[22px]
                        min-[375px]:text-[24px]
                        min-[767px]:text-[40px]
                        min-[767px]:pt-[50px]
                        "
                >
                    <div className="m-0">
                        <span className="whitespace-nowrap block min-[767px]:inline">Выбери подходящий</span>{" "}
                        <span className="block min-[440px]:inline">для себя <span
                            className="text-[var(--color-yellow)]">тариф</span>
                        </span>
                    </div>
                </div>

                <div className={"container-image"}>
                    <div className={"image"}></div>

                    <div className="main-conter">
                        {tariffs && tariffs?.length > 0 && (
                            <TariffCard
                                tariff={tariffs[0]}
                                isDiscountActive={isDiscountActive}
                                selected={selectedId === tariffs[0].id}
                                onSelect={() => setSelectedId(tariffs[0].id)}
                                onBuyClick={handleBuy}
                                showBig={tariffs[0].is_best}
                                isFirst
                            />
                        )}

                        <div className="deals-container">
                            {tariffs?.slice(1).map((t, idx) => (
                                <TariffCard
                                    key={t.id}
                                    tariff={t}
                                    isDiscountActive={isDiscountActive}
                                    selected={selectedId === t.id}
                                    onSelect={() => setSelectedId(t.id)}
                                    onBuyClick={handleBuy}
                                    showBig={t.is_best}
                                />
                            ))}
                        </div>



                        {/*{tariffs?.map((t, idx) => {*/}
                        {/*    return (*/}
                        {/*        <TariffCard*/}
                        {/*            key={`${t.id}-${idx}`}*/}
                        {/*            tariff={t}*/}
                        {/*            isDiscountActive={isDiscountActive}*/}
                        {/*            selected={selectedId === t.id}*/}
                        {/*            onSelect={() => setSelectedId(t.id)}*/}
                        {/*            onBuyClick={handleBuy}*/}
                        {/*            showBig={t.is_best}*/}
                        {/*        />*/}
                        {/*    )*/}
                        {/*})}*/}


                        <div className="desctiption">
                            Примечание: при окончании таймера скидочные цены исчезнут и останутся полные цены.
                        </div>

                        <div className="text-soglq">
                            <div className="text-soglq">
                                <label
                                    className={`flex items-center gap-2 cursor-pointer select-none ${
                                        buyError ? 'text-red-400' : ''
                                    }`}
                                    onClick={() => {
                                        setAgreeChecked(!agreeChecked);
                                        setBuyError(null);
                                    }}
                                >
                                    <div
                                        className={`custom-checkbox ${agreeChecked ? 'checked' : ''} ${
                                            buyError ? 'error' : ''
                                        }`}
                                    >
                                        {agreeChecked && (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#FDB056"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="21 5 10 18 3 11" />
                                            </svg>
                                        )}
                                    </div>

                                    <span className="text-sogl">
      Я согласен с офертой рекуррентных платежей и Политикой конфиденциальности
    </span>
                                </label>
                            </div>

                            {/*<label className={`flex items-center gap-2 ${buyError ? 'text-red-400' : ''}`}>*/}
                            {/*    <input*/}
                            {/*        type="checkbox"*/}
                            {/*        checked={agreeChecked}*/}
                            {/*        onChange={(e) => {*/}
                            {/*            setAgreeChecked(e.target.checked);*/}
                            {/*            setBuyError(null)*/}
                            {/*        }}*/}
                            {/*        className={`w-4 h-4 rounded ${buyError ? 'ring-2 ring-red-400' : ''}`}*/}
                            {/*    />*/}
                            {/*    <span className="text-sogl">Я согласен с офертой рекуррентных платежей и Политикой конфиденциальности </span>*/}
                            {/*</label>*/}
                        </div>

                        <div className="btn-div">
                            <button
                                onClick={() => selectedId && handleBuy(selectedId)}
                                className="btn"
                            >
                                Купить
                            </button>
                        </div>
                        {buyError && <div className="text-red-400 text-sm ml-4">{buyError}</div>}

                        <div className="text-div">
                            Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для
                            получения
                            пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой
                            карты
                            будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания
                            пользователя.
                        </div>
                    </div>
                </div>

                <div className="gray-container">
                    <div className="green-div">
                        гарантия возврата 30 дней
                    </div>

                    <div className="gray-div">
                        Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
                        Мы
                        даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не
                        получишь
                        видимых результатов.
                    </div>
                </div>

            </div>
        </div>
    )
}

