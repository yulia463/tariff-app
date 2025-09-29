'use client'

import {useGetItemsQuery} from "services/api";

export default function Home() {
  const { data, error, isLoading } = useGetItemsQuery();
  console.log("DATA>>>>", data)

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка при загрузке</div>

  return (
      <div>
        <h1>Данные с API:</h1>
        {data?.map((item: any, index: number) => (
            <div key={index} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
              {JSON.stringify(item)}
            </div>
        ))}
      </div>
  )
}
