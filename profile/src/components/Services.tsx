import { motion } from "framer-motion";
import { useLanguage } from "../i18n/i18n";
import "./Services.css";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("services.s1.title"),
      desc: t("services.s1.desc"),
      tech: t("services.s1.tech"),
    },
    {
      title: t("services.s2.title"),
      desc: t("services.s2.desc"),
      tech: t("services.s2.tech"),
    },
    {
      title: t("services.s3.title"),
      desc: t("services.s3.desc"),
      tech: t("services.s3.tech"),
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
              <div className="service-card__tech">
                <span className="pill">{service.tech}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
