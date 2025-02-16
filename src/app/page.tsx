'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DateTimeFormatter, LocalTime } from 'js-joda';

type FormValues = {
  hoursWorked: number;
  wfhStartTime: string;
};

function calculate(hoursCompletedInOffice: number, wfhStartTime: string): string {
  const hoursLeft: number = 9.25 - hoursCompletedInOffice;
  const minutesLeft: number = hoursLeft * 60;

  const formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm");
  const localStartTime: LocalTime = LocalTime.parse(wfhStartTime, formatter);

  return localStartTime.plusMinutes(Math.floor(minutesLeft) + 1).toString();
}

export default function Page() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      wfhStartTime: "09:00", 
      hoursWorked: 3.5
    },
  });
  const [submitted, setSubmitted] = useState(false);
  const [workUntil, setWorkUntil] = useState("");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
    setWorkUntil(calculate(data.hoursWorked, data.wfhStartTime))
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4"> 
          <div className="card p-4 shadow">
            <h2 className="mb-4 text-center">Work from Home Form</h2>
            {submitted &&
              <div className="alert alert-success text-center">Work until {workUntil}</div>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Hours Worked</label>
                <input
                  type="number"
                  {...register('hoursWorked', { required: 'Hours worked is required' })}
                  className="form-control"
                  step="0.25"
                  min="0"
                  max="9.25"
                />
                {errors.hoursWorked && <div className="text-danger">{errors.hoursWorked.message}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">WFH Start Time</label>
                <input
                  type="time"
                  {...register('wfhStartTime', {
                    required: 'Start time is required',
                  })}
                  className="form-control"
                  step="900" 
                />
                {errors.wfhStartTime && <div className="text-danger">{errors.wfhStartTime.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Calculate
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}