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
}

const TeachersContext = createContext<TeachersContextData>({} as TeachersContextData);

export const TeachersProvider: React.FC = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [quantityTeachers, setQuantityTeachers] = useState(0);

  async function getTeachers(params: ParamsProps) {
    if (params.per_page * params.page > quantityTeachers + params.per_page) {
      return;
    }

    const response = await api.get('/classes', { params });

    if (response) {
      const data = response.data;
  
      const newTeachers = [ ...data.classes_by_page ]
      
      setQuantityTeachers(data.quantity_teachers);

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
      value={{teachers, getTeachers, setTeachers, quantityTeachers}}
    >
      {children}
    </TeachersContext.Provider>
  )
}

export default TeachersContext;
