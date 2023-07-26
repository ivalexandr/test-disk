import { Dispatch, SetStateAction } from "react";

export const uploadFilesToYaDisk = async (files: File[], token: string, setCount: Dispatch<SetStateAction<number>>) => {
  if (files.length < 1) {
    return 'Файл должен быть как минимум один';
  }

  if (files.length > 100) {
    return 'Максимальное число файлов для загрузки - 100';
  }

  for(let i = 0; i < files.length; i++) {
    const item = files[i];
    const res = await fetch(`https://cloud-api.yandex.net/v1/disk/resources/upload?path=${item.name}`, {
      headers: {
        'Authorization': `OAuth ${token}`
      }
    });
    setCount(i + 1);
    const path = await res.json() as { method: string, href: string };

    const formData = new FormData();
    formData.append('file', item);

    await fetch(path.href, {
          method: path.method,
          body: formData,
      })

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};
