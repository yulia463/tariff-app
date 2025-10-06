'use client'

import {useGetItemsQuery} from "services/api";
import React from 'react'
import HeaderTimer from "@/app/components/HeaderTimer";
import TariffCard from "@/app/components/TariffCard";

export default function Page() {
    const {data: tariffs, error, isLoading} = useGetItemsQuery()
    const [isDiscountActive, setDiscountActive] = React.useState(true)
    const [selectedId, setSelectedId] = React.useState<string | null>( null)
    const [agreeChecked, setAgreeChecked] = React.useState(false)
    const [buyError, setBuyError] = React.useState<string | null>(null)

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
        <div className="min-h-screen bg-bg text-white">
            <HeaderTimer startSeconds={959} onExpire={onExpire}/>

            <div className="bg-bg px-4 md:px-[15%]">
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
                    <div className="m-0 min-[767px]:mb-[110px]">
                        <span className="whitespace-nowrap block min-[767px]:inline">Выбери подходящий</span>{" "}
                        <span className="block min-[440px]:inline">для себя <span
                            className="text-yellow">тариф</span>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div
                        className={`
                         mt-[24px] 
                         h-[200px] 
                         bg-bg
                         bg-center bg-no-repeat bg-contain
                         sm:mt-[20px] sm:h-[250px]
                         md:w-2/5 md:h-auto md:min-h-[300px]
        `}
                        style={{backgroundImage: `url(/assets/background.png)`}}

                    ></div>

                    <div
                        className={`
                         flex flex-col gap-[6px] 
                         sm:gap-[8px] 
                         md:gap-[14px]
        `}
                    >
                        {tariffs && tariffs.length > 0 && (
                            <TariffCard
                                tariff={tariffs[0]}
                                isDiscountActive={isDiscountActive}
                                selected={selectedId === `${tariffs[0].id}${tariffs[0].price}`}
                                onSelect={() => setSelectedId(`${tariffs[0].id}${tariffs[0].price}`)}
                                onBuyClick={handleBuy}
                                showBig={tariffs[0].is_best}
                                isFirst
                            />
                        )}
                        <div
                            className={`
                             flex flex-col gap-[6px]
                             sm:gap-[8px]
                             md:flex-row md:gap-[14px] 
    `}
                        >
                            {tariffs?.slice(1).map((t) => (
                                <TariffCard
                                    key={t.id}
                                    tariff={t}
                                    isDiscountActive={isDiscountActive}
                                    selected={selectedId === `${t.id}${t.price}`}
                                    onSelect={() => setSelectedId(`${t.id}${t.price}`)}
                                    showBig={t.is_best}
                                    isFirst={false}
                                />
                            ))}
                        </div>
                        <div
                            className="
                             flex bg-gray-300
                             rounded-[16px]
                             mb-4 sm:mb-6
                             p-[14px]
                             sm:p-[14px_35px_14px_40px]
                             md:mb-7 md:p-[18px_20px_18px_52px]
                             md:max-w-[500px] items-start gap-2"
                        >
                            <span
                                className="
                                 font-bold text-yellow
                                 min-[320px]:pl-3
                                 min-[375px]:pl-3
                                 min-[767px]:pl-5"
                            >!</span>
                            <span
                                className="text-[12px] md:text-[16px]">
                                Следуя плану на 3 месяца и более, люди <span
                                className="md:block">
                                получают в 2 раза лучший результат, чем за 1 месяц
                            </span>
  </span>
                        </div>
                        <div className="
                              mb-[16px]
                              sm:mb-[20px]
                              md:mb-[16px]">
                            <label
                                className={`
                                flex items-center 
                                gap-[8px] 
                                cursor-pointer 
                                select-none
                                ${buyError ? 'text-red-400' : 'text-white'}
        `}
                                onClick={() => {
                                    setAgreeChecked(!agreeChecked);
                                    setBuyError(null);
                                }}
                            >
                                <div
                                    className={`
                                     w-[30px] h-[30px]
                                     flex-shrink-0 flex items-center justify-center
                                     rounded-[6px]
                                     border-2 border-gray-check-box-600
                                     bg-bg
                                     transition-all duration-200 ease-in-out
                                     ${agreeChecked ? 'border-gray-check-box-600' : ''}
                                     ${buyError ? 'border-red-500' : ''}
            `}
                                >
                                    {agreeChecked && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="yellow"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="21 5 10 18 3 11"/>
                                        </svg>
                                    )}
                                </div>
                                <span className="ml-[10px] sm:ml-[12px]">
            Я согласен с офертой рекуррентных платежей и Политикой конфиденциальности
        </span>
                            </label>
                        </div>

                        <div className="
                              mb-[10px]
                              sm:mb-[20px]
                              sm:mr-[16px]
                              md:mb-[34px]
                              md:mt-[36px]"
                        >
                            <button
                                onClick={() => handleBuy(selectedId || '')}
                                className={`
                                 flex justify-center items-center w-full max-w-[352px]
                                 h-[55px] bg-yellow text-bgc
                                 rounded-[20px] font-bold text-[18px]
                                 hover:bg-yellow/80 active:bg-yellow/60
                                transition-all duration-150
                                ${buyError ? 'animate-pulse border-2 border-red-500' : ''}
        `}
                            >
                                Купить
                            </button>
                        </div>
                        {buyError && (
                            <div className="text-red-400 text-sm ml-[16px] mt-[4px]">
                                {buyError}
                            </div>
                        )}
                        <div
                            className={`
                             text-[10px] font-normal 
                             text-gray
                             mb-[22px] max-w-[748px]
                             sm:mb-[24px]
                             md:mb-[66px]
        `}
                        >
                            Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств
                            для
                            получения пожизненного доступа к приложению. Пользователь соглашается, что данные
                            кредитной/дебетовой
                            карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае
                            желания
                            пользователя.
                        </div>
                    </div>
                </div>
                <div
                    className={`
                     border border-gray-dark
                     rounded-[20px] 
                     p-[12px] md:p-[20px]
    `}
                >
                    <div
                        className={`
                         border border-div-green 
                         rounded-[30px] 
                         px-[18px] py-[10px] 
                         text-div-green
                         font-medium leading-[120%] 
                         text-[16px] sm:text-[18px] md:px-[30px] md:py-[16px] md:text-[28px]
        `}
                    >
                        гарантия возврата 30 дней
                    </div>
                    <div
                        className={`
                         mt-[10px] font-normal text-text-div
                         text-[13px] sm:text-[14px] md:mt-[30px] md:text-[24px]
        `}
                    >
                        Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели!
                        Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не
                        получишь видимых результатов.
                    </div>
                </div>
            </div>
        </div>
    )
}
