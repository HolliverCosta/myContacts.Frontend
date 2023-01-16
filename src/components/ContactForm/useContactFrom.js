import isEmailValid from "../../utils/isEmailValid";
import useErrors from "../../hooks/useErrors";
import formatPhone from "../../utils/formatPhone";
import CategoriesService from "../../services/CategoriesService";
import { useState, useEffect, useImperativeHandle } from "react";

export default function useContactForm(onSubmit, ref) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors();

  const isFormValid = name && errors.length === 0;

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? "");
        setEmail(contact.email ?? "");
        setPhone(formatPhone(contact.phone ?? ""));
        setCategoryId(contact.category.id ?? "");
      },
      resetFields: () => {
        setName("");
        setEmail("");
        setPhone("");
        setCategoryId("");
      },
    }),
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(
          controller.signal
        );

        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();

    return () => {
      controller.abort();
    };
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: "name", message: "nome e obrigatorio" });
    } else {
      removeError("name");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: "email", message: "E-mail invalido" });
    } else {
      removeError("email");
    }
  };

  const handlePhoneChange = async (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });

    setIsSubmitting(false);
  };
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    categoryId,
    isLoadingCategories,
    categories,
    isFormValid,
    setCategoryId,
  };
}
