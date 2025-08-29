import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { Toaster } from "@/components/ui/toaster";
import { ScrollAnimation } from "@/components/ScrollAnimations";
import { useSEO } from "@/hooks/useSEO";
import { seoConfig } from "@/config/seo";

const PrivacyPolicy = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    useSEO(seoConfig.pages.privacy);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <div className="pt-24">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold font-poppins text-warmBrown mb-3">
                            Privacy Policy
                        </h1>
                        <p className="text-warmBrown/80 font-merriweather">
                            How we collect, use, and protect your personal data.
                        </p>
                    </div>

                    <ScrollAnimation direction="up" delay={150}>
                        <div className="space-y-6 text-warmBrown/90 font-merriweather leading-relaxed">
                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Introduction
                            </h2>
                            <p>
                                This Privacy Policy describes how{" "}
                                <strong>Namo India Food Industries</strong>{" "}
                                ("we", "our", "us") collect, use, share,
                                protect, and otherwise process your
                                information/personal data through our website{" "}
                                <strong>
                                    https://www.namoindianamkeen.com
                                </strong>{" "}
                                (the "Platform"). By visiting the Platform or
                                using our services, you agree to this Privacy
                                Policy and the Terms of Use. If you do not
                                agree, please do not access the Platform.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Collection
                            </h2>
                            <p>
                                We collect personal data when you use our
                                Platform, services, or otherwise interact with
                                us. This may include your name, date of birth,
                                address, telephone/mobile number, email ID,
                                identity/address proof information, and
                                transactional information. With your consent and
                                as permitted by law, we may collect sensitive
                                personal data such as bank account or payment
                                instrument information, or biometric information
                                used to enable optional features on the
                                Platform.
                            </p>
                            <p>
                                You may choose not to provide certain
                                information; however, this may limit your
                                ability to use specific features. We may track
                                your behavior and preferences on an aggregated
                                basis and collect information related to your
                                transactions on the Platform and on third-party
                                partner platforms. When personal data is
                                collected directly by a third party, their
                                privacy policies apply.
                            </p>
                            <p>
                                We will never ask for your debit/credit card
                                PIN, net-banking password, or mobile banking
                                password. If you receive such a request, please
                                report it to the appropriate law enforcement
                                agency.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Usage
                            </h2>
                            <p>
                                We use personal data to provide and improve our
                                services, assist with orders, enhance customer
                                experience, resolve disputes, troubleshoot
                                problems, inform you about offers, customize
                                your experience, detect and prevent fraud,
                                enforce our terms, conduct research and surveys,
                                and as otherwise described at the time of
                                collection. Where required, we provide the
                                ability to opt out of marketing communications.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Sharing
                            </h2>
                            <p>
                                We may share personal data within our group
                                entities and affiliates to provide you access to
                                their services and products. These entities may
                                market to you unless you opt out. We may
                                disclose personal data to third parties such as
                                sellers, logistics partners, payment providers,
                                reward programs, and other service providers, to
                                provide services, comply with legal obligations,
                                enforce agreements, prevent fraud, and for
                                legitimate business interests.
                            </p>
                            <p>
                                We may disclose personal and sensitive personal
                                data to government or law enforcement agencies
                                as required by law or in good faith to respond
                                to legal process, enforce our policies, respond
                                to claims, or protect the rights, property, or
                                safety of users or the public.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Security Precautions
                            </h2>
                            <p>
                                We adopt reasonable security practices and
                                procedures to protect your personal data from
                                unauthorized access, disclosure, loss, or
                                misuse. While we use secure servers and adhere
                                to our security guidelines, transmission of
                                information over the internet has inherent
                                risks. Users are responsible for protecting
                                their account login and password.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Data Deletion and Retention
                            </h2>
                            <p>
                                You may delete your account via your
                                profile/settings or by contacting us using the
                                details below. We may refuse or delay deletion
                                if there are pending grievances, claims,
                                shipments, or services. Once deleted, you will
                                lose access to your account. We retain personal
                                data no longer than necessary for the purposes
                                collected or as required by law, and may retain
                                anonymized data for analytics and research.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Your Rights
                            </h2>
                            <p>
                                You may access, rectify, and update your
                                personal data through Platform functionalities.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Consent
                            </h2>
                            <p>
                                By using the Platform or providing your
                                information, you consent to the collection, use,
                                storage, disclosure, and processing of your
                                information in accordance with this Privacy
                                Policy. If you provide personal data of others,
                                you represent you have authority to do so. You
                                consent to us and our partners contacting you
                                via SMS, instant messaging apps, calls, and/or
                                email for purposes described herein. You may
                                withdraw consent by writing to the Grievance
                                Officer below; withdrawal will be prospective
                                and subject to Terms of Use, this Privacy
                                Policy, and applicable laws.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Changes to this Privacy Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy from time to
                                time. Please review it periodically. We may
                                notify you of significant changes as required by
                                applicable laws.
                            </p>

                            <h2 className="text-2xl font-semibold text-warmBrown">
                                Grievance Officer
                            </h2>
                            <div className="space-y-1">
                                <p>Company: Namo India Food Industries</p>
                                <p>
                                    Address: 65-A, Nagin Nagar, Indore (M.P.),
                                    India
                                </p>
                                <p>
                                    Email: namoindiaifoodindustriess@gmail.com
                                </p>
                                <p>Phone: +91 88238 18001</p>
                                <p>Hours: Monday - Friday (09:00 - 18:00)</p>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>
            </div>
            <Footer />
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
            <Toaster />
        </div>
    );
};

export default PrivacyPolicy;
