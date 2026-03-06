import { motion } from "framer-motion";
import { useLanguage } from "../i18n/i18n";
import "./Services.css";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("services.s1.title"),
      desc: t("services.s1.desc"),
      benefits: [t("services.s1.b1"), t("services.s1.b2"), t("services.s1.b3")],
    },
    {
      title: t("services.s2.title"),
      desc: t("services.s2.desc"),
      benefits: [t("services.s2.b1"), t("services.s2.b2"), t("services.s2.b3")],
    },
    {
      title: t("services.s3.title"),
      desc: t("services.s3.desc"),
      benefits: [t("services.s3.b1"), t("services.s3.b2"), t("services.s3.b3")],
    },
  ];

  return (
    <section className="services-section" id="servicos">
      <div className="container">
        <h2 className="section__title">{t("services.title")}</h2>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
            >
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
              <ul className="service-card__benefits-list">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="service-card__benefit-item">
                    <svg className="benefit-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
