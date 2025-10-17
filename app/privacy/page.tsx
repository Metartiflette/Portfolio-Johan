// app/privacy/page.tsx

import Link from 'next/link';
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
    return (
        <main className="relative min-h-screen px-6 md:px-12">
            <Link
                href="/"
                className="group mt-38 mb-4 md:mt-46 md:mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors "
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to home
            </Link>
            <div className="mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Collecte des données</h2>
                    <p className="mb-4">
                        Ce site personnel ne collecte aucune donnée personnelle identifiable.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Données techniques</h2>
                    <p className="mb-4">
                        Lors de votre visite, des informations techniques standard peuvent être
                        enregistrées par l'hébergeur (adresse IP, type de navigateur, pages visitées)
                        uniquement à des fins de statistiques.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Formulaire de contact</h2>
                    <p className="mb-4">
                        Si un formulaire de contact est présent, les informations fournies
                        (nom, email, message) sont utilisées uniquement pour répondre à vos demandes
                        et ne sont jamais partagées avec des tiers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Vos droits</h2>
                    <p className="mb-4">
                        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
                        et de suppression de vos données personnelles.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
                    <p>
                        Pour toute question concernant vos données, contactez-moi via le
                        formulaire de contact du site.
                    </p>
                </section>

                <p className="text-sm text-gray-600 mt-8">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                </p>
            </div>
        </main>
    );
}