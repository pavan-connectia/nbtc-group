import React, { useState } from "react";
import { Button, Heading, Input, Textarea } from "../";
import {
  useGetCareersOpeningQuery,
  usePostCareersFormMutation,
} from "@/redux/api/careersApi";
import toast from "react-hot-toast";
import { usePostUploadMutation } from "@/redux/api/uploadApi";
import { useTranslation } from "react-i18next";

const CareerForm = () => {
  const { t, i18n } = useTranslation();
  const { data } = useGetCareersOpeningQuery();
  const [uploadResume] = usePostUploadMutation();
  const [postCareerForm] = usePostCareersFormMutation();

  const currentLang = i18n.language === "ar" ? "ar" : "en";

  const initialState = {
    selectedOpening: "",
    fName: "",
    mName: "",
    lName: "",
    nationality: "",
    age: "",
    gender: "",
    email: "",
    countryCode: "+91",
    phone: "",
    location: "",
    experience: "",
    eduQualification: "",
    techQualification: "",
    remarks: "",
    resume: "",
  };

  const countryCodes = [
    { code: "+91", label: "India (+91)" },
    { code: "+965", label: "Kuwait (+965)" },
    { code: "+971", label: "UAE (+971)" },
    { code: "+966", label: "Saudi Arabia (+966)" },
    { code: "+974", label: "Qatar (+974)" },
  ];

  const [formData, setFormData] = useState(initialState);

  const isJobActive = (endDate) =>
    !endDate || new Date(endDate) >= new Date();

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "resume") {
      setFormData({ ...formData, resume: files[0] || "" });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { selectedOpening, fName, email, phone, resume } = formData;

    if (!selectedOpening || !fName || !email || !phone) {
      toast.error("All required fields must be filled");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", resume);

    try {
      const resumeUploadRes = await uploadResume({
        image: formDataToUpload,
        folder: "/uploads/resumes",
      }).unwrap();

      const res = await postCareerForm({
        ...formData,
        phone: `${formData.countryCode}${formData.phone}`,
        resume: resumeUploadRes?.filePath,
      });

      if (res?.data?.success) {
        toast.success("Application sent successfully");
        setFormData(initialState);
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <select
        className="my-10 w-full px-3 py-2 text-blue"
        id="selectedOpening"
        value={formData.selectedOpening}
        onChange={handleChange}
      >
        <option value="">{t("careers.choose_an_opening")}</option>

        {data?.data
          ?.filter((d) => isJobActive(d?.endDate))
          .map((d) => (
            <option key={d._id} value={d._id}>
              {d.title[currentLang]}
            </option>
          ))}
      </select>

      <Heading
        variant="big"
        className="py-5 text-lg font-medium uppercase"
      >
        {t("careers.basic_details")}
      </Heading>

      <form className="py-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5 md:space-y-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Input
              placeholder="Enter the First Name"
              label="First Name"
              id={"fName"}
              value={formData.fName}
              onChange={handleChange}
            />

            <Input
              placeholder="Enter the Middle Name"
              label="Middle Name"
              id={"mName"}
              value={formData.mName}
              onChange={handleChange}
            />
            <Input
              placeholder="Enter the Last name"
              label="Last Name"
              id={"lName"}
              value={formData.lName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Input
              placeholder="Enter the Nationality"
              label="Nationality"
              id={"nationality"}
              value={formData.nationality}
              onChange={handleChange}
            />

            <Input
              placeholder="Enter the Age"
              label="Age"
              id={"age"}
              type="number"
              value={formData.age}
              onChange={handleChange}
            />

            <div className="w-full space-y-1.5">
              <label htmlFor="gender" className="font-medium text-blue">
                Gender
              </label>

              <div className="flex items-center gap-5 py-2">
                <div className="flex items-center gap-1">
                  <label htmlFor="male">Male</label>
                  <input id="male" type="radio" name="gender" />
                </div>

                <div className="flex items-center gap-1">
                  <label htmlFor="female">Female</label>
                  <input id="female" type="radio" name="gender" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Email */}
            <Input
              placeholder="Enter the Email"
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone Section */}
            <div className="grid grid-cols-3 gap-3">
              {/* Country Code */}
              <div className="col-span-1 space-y-1.5">
                <label className="font-medium text-blue">Country</label>
                <select
                  id="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-blue"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div className="col-span-2">
                <Input
                  placeholder="Enter the Phone Number"
                  id="phone"
                  type="tel"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              placeholder="Enter the Current Location"
              id={"location"}
              label={"Current Location"}
              value={formData.location}
              onChange={handleChange}
            />

            <Input
              placeholder="Enter the Experience"
              id={"experience"}
              label="Experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              placeholder="Enter the Education Qualification"
              id={"eduQualification"}
              label={"Education Qualification"}
              value={formData.eduQualification}
              onChange={handleChange}
            />

            <Input
              placeholder="Enter the Technical Qualification"
              id={"techQualification"}
              label="Technical Qualification"
              value={formData.techQualification}
              onChange={handleChange}
            />
          </div>

          <Textarea
            id="remarks"
            label="Additional Remarks (if any)"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
          />

          <Input
            type="file"
            className="col-span-full"
            id={"resume"}
            accept=".pdf"
            onChange={handleChange}
          />

          <Button
            text="Apply for job"
            type="submit"
            className="col-span-full rounded-md uppercase"
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CareerForm;
