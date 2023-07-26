import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { IHandlerResponse } from "../../declares/type";
import { uploadFilesToYaDisk } from "../../services/upload-files.service";
import s from './style.module.css';
import { Spinner } from "../spinner";

export interface IUploadProps {
  auth: IHandlerResponse;
}

export const Upload:FC<IUploadProps> = ({ auth }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [countOfFile, setCountOfFile] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = fileInput.current?.files;

    if (files && auth) {
      setIsUpload(true);
      const error = await uploadFilesToYaDisk(Array.from(files), auth.access_token, setCountOfFile);
      setError(error);
      setIsUpload(false);
    }
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setTotalFiles(files.length);
    }
  };

  const spinner = (
    <>
      <p>Идет загрузка...</p>
      <Spinner />
    </>
  )

  return (
    <>
      <form onSubmit={submitHandler} className={s.form}>
        <h2>Загрузка файлов</h2>
        <div className={s.form_field}>
          <label htmlFor="file" className={s.label}>
            Выбрать файлы
          </label>
          <input 
            id="file"
            className={s.input}
            multiple ref={fileInput}
            name="file"
            type="file"
            onChange={inputChangeHandler} 
          />
        </div>
        <button className={s.submit}>Загрузить</button>
        <div>
          Загружено { countOfFile } файлов из { totalFiles }
        </div>
        {error && (
          <div>
            { error }
        </div>
        )}
        { isUpload && spinner }
      </form>
    </>
  );
};
