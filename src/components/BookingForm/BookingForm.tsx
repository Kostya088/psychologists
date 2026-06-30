import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Psychologist } from "../../types/psychologists";
import css from "./BookingForm.module.css";

const schema = yup.object().shape({
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
  comment: yup
    .string()
    .max(200, "Comment can contain only up to 200 symbols")
    .required("Comment is required"),
});

type BookingFormData = yup.InferType<typeof schema>;

interface BookingFormProps {
  psychologist: Psychologist & { id: string };
}

export const BookingForm = ({ psychologist }: BookingFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: BookingFormData) => {
    void data;
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
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
