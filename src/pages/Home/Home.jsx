import DonationSection from "../../components/Home/DonationSection";
import HeroCarousel from "../../components/hero/HeroCarousel";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div>
            <HeroCarousel></HeroCarousel>
            <DonationSection></DonationSection>
            
            {/* Available Donors Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Available Blood Donors
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Find donors in your area who are ready to help
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                to="/donors"
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                View All Donors
                            </Link>
                            {!user && (
                                <Link
                                    to="/create-blood-requests"
                                    className="bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Request Blood
                                </Link>
                            )}
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
                            <div className="text-gray-600">Registered Donors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
                            <div className="text-gray-600">Lives Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                            <div className="text-gray-600">Emergency Support</div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to Make a Difference?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join our community of lifesavers today
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                to="/register"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Become a Donor
                            </Link>
                            <Link
                                to="/aboutUs"
                                className="bg-white hover:bg-gray-50 text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;