import React, { useState, createContext } from 'react';

import api from '../services/api';

export interface Schedule {
  id_class_schedule: number,
  week_day: string,
  from: string,
  to: string,
}

export interface Teacher {
  id_class: number,
  avatar: string,
  first_name: string,
  last_name: string,
  email: string,
  subject: string,
  biography: string,
  cost: string,
  whatsapp: string,
  schedules: [Schedule],
}

interface ParamsProps {
  id_subject: string,
  week_day: string,
  time: string,
  page: number,
  per_page: number,
}

interface TeachersContextData {
  teachers: Teacher[],
  getTeachers(params: ParamsProps): Promise<void>,
  setTeachers(teacher: Teacher[]): void,
  quantityTeachers: number,
  quantityClasses: number,
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [quantityTeachers, setQuantityTeachers] = useState(0);
  const [quantityClasses, setQuantityClasses] = useState(0);

  async function getTeachers(params: ParamsProps) {
    if (params.per_page * params.page > quantityClasses + params.per_page) {
      return;
    }

    const response = await api.get('/classes', { params });

    if (response) {
      const data = response.data;
  
      const newTeachers = data.classesByPage.map((teacher: Teacher) => {
        return { ...teacher };
      });

      setQuantityTeachers(data.quantityTeachers);
      setQuantityClasses(data.quantityClasses);

      if (params.page === 1) {
        setTeachers([...newTeachers]);
      }

      else {
        setTeachers([...teachers, ...newTeachers]);
      }
    }
  }

  return (
    <TeachersContext.Provider 
      value={{teachers, getTeachers, setTeachers, quantityTeachers, quantityClasses}}
    >
      {children}
    </TeachersContext.Provider>
  )
}

export default TeachersContext;
