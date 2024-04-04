'use client';

import { FormEvent, useEffect, useRef } from 'react';

import { TableComponents } from '@/components/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTableDataGetMutation } from '@/hook/useTableDataGetMutation';

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const tableList = useTableDataGetMutation();

  useEffect(() => {
    // 초기 렌더링 시, 결과물을 불러오기 위함
    tableList.mutateAsync({ searchCondition: '' });
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      tableList.mutateAsync({ searchCondition: inputRef.current.value });
    }
  };

  // TODO: Checkbox 클릭 후 설정하면 상태 변경되도록 구현
  // 이때 Date가 변경되어야함

  return (
    <div className="h-screen w-screen">
      <div className="mx-auto w-[900px] pb-20 pt-10">
        <form
          onSubmit={onSubmit}
          className="mb-2 flex items-center justify-between gap-2"
        >
          <Input
            ref={inputRef}
            className="w-[20%]"
            type="text"
            placeholder="Task name"
          />
          <Button>Done!</Button>
        </form>
        <TableComponents data={tableList.data?.list || []} />
      </div>
    </div>
  );
}
