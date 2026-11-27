import { useEffect } from 'react';

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | VIPRACUBE TECH` : 'VIPRACUBE TECH';
  }, [title]);
};

export default useDocumentTitle;
