import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Psychologist } from "../../types/psychologists";
import css from "./BookingForm.module.css";
import toast from "react-hot-toast";

interface BookingFormData {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment?: string;
}

const schema: yup.ObjectSchema<BookingFormData> = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9\s()-]{9,20}$/, "Invalid phone number format")
    .required("Phone number is required"),
  time: yup.string().required("Meeting time is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  comment: yup.string().max(200, "Comment can contain only up to 200 symbols"),
});

interface BookingFormProps {
  psychologist: Psychologist & { id: string };
  onSuccess?: () => void;
}

export const BookingForm = ({ psychologist, onSuccess }: BookingFormProps) => {
  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: yupResolver(schema),
  });

  const handleSubmit = submitForm((data: BookingFormData) => {
    void data;
    onSuccess?.();
    toast.success("Thank you for making an appointmenr!");
  });

  return (
    <div>
      <h2 className={css.title}>Make an appointment with a psychologist</h2>
      <p className={css.description}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={css.doctorWrapper}>
        <img
          className={css.avatar}
          src={psychologist.avatar_url}
          alt={psychologist.name}
          width={44}
          height={44}
        />

        <div className={css.nameWrapper}>
          <p className={css.profession}>Your psychologist</p>
          <p className={css.name}>{psychologist.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.inputGroup}>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={css.inputField}
          />
          {errors.name && (
            <span className={css.errorText}>{errors.name.message}</span>
          )}
        </div>

        <div className={css.phoneTimeGroup}>
          <div className={css.inputGroup}>
            <input
              type="tel"
              placeholder="+380"
              {...register("phone")}
              className={css.inputField}
            />
            {errors.phone && (
              <span className={css.errorText}>{errors.phone.message}</span>
            )}
          </div>

          <div className={css.inputGroup}>
            <input
              type="time"
              {...register("time")}
              className={css.inputField}
            />
            {errors.time && (
              <span className={css.errorText}>{errors.time.message}</span>
            )}
          </div>
        </div>

        <div className={css.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={css.inputField}
          />
          {errors.email && (
            <span className={css.errorText}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.inputGroup}>
          <textarea
            placeholder="Comment"
            rows={5}
            {...register("comment")}
            className={css.inputField}
          />
          {errors.comment && (
            <span className={css.errorText}>{errors.comment.message}</span>
          )}
        </div>

        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};
