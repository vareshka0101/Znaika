<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('forum_topics', function (Blueprint $table) {
            if (!Schema::hasColumn('forum_topics', 'is_pinned')) {
                $table->boolean('is_pinned')->default(false)->after('views');
            }
            if (!Schema::hasColumn('forum_topics', 'is_locked')) {
                $table->boolean('is_locked')->default(false)->after('is_pinned');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('forum_topics', function (Blueprint $table) {
            $table->dropColumn(['is_pinned', 'is_locked']);
        });
    }
};
