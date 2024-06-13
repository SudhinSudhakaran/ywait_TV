#include "pch.h"
#include "MainPage.h"

#include "MainPage.g.cpp"


#include "App.h"

using namespace winrt;
using namespace Windows::UI::Xaml;

namespace winrt::ywaittvapp::implementation
{
    MainPage::MainPage()
    {
        InitializeComponent();
        auto app = Application::Current().as<App>();
        ReactRootView().ReactNativeHost(app->Host());
    }
}
